from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Order, OrderItem, Product, StockMovementLog
from django.db import transaction
from django.core.mail import send_mail
from django.conf import settings

@receiver(pre_save, sender=Product)
def log_product_stock_change(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Product.objects.get(pk=instance.pk)
            if old_instance.current_stock != instance.current_stock:
                # Stock changed, let's figure out reason if not explicitly set
                diff = instance.current_stock - old_instance.current_stock
                # Default reason if not provided in some context
                # To be completely robust, we could pass reason via instance._stock_reason
                reason = getattr(instance, '_stock_change_reason', 'MANUAL_ADJUSTMENT')
                user = getattr(instance, '_stock_change_user', None)
                ref = getattr(instance, '_stock_change_reference', None)
                
                StockMovementLog.objects.create(
                    product=instance,
                    previous_quantity=old_instance.current_stock,
                    new_quantity=instance.current_stock,
                    quantity_changed=diff,
                    reason=reason,
                    user=user,
                    reference=ref
                )
        except Product.DoesNotExist:
            pass
    else:
        # New product being created
        if instance.current_stock > 0:
            # We defer creation to post_save since we need the product instance to be saved first
            instance._is_new_with_stock = True

@receiver(post_save, sender=Product)
def log_new_product_stock(sender, instance, created, **kwargs):
    if created and getattr(instance, '_is_new_with_stock', False):
        user = getattr(instance, '_stock_change_user', None)
        StockMovementLog.objects.create(
            product=instance,
            previous_quantity=0,
            new_quantity=instance.current_stock,
            quantity_changed=instance.current_stock,
            reason='NEW_PURCHASE',
            user=user
        )

@receiver(pre_save, sender=Order)
def handle_order_stock(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Order.objects.get(pk=instance.pk)
            old_status = old_instance.status
            new_status = instance.status

            if old_status != new_status:
                with transaction.atomic():
                    # Deduct stock when Confirmed (or directly to Processing/Delivered etc from pending)
                    # For simplicity, if it moves from PENDING/PAYMENT_PENDING to a 'paid/confirmed' state:
                    confirmed_states = ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED']
                    if old_status not in confirmed_states and new_status in confirmed_states:
                        for item in instance.items.all():
                            product = item.product
                            product._stock_change_reason = 'CUSTOMER_ORDER'
                            product._stock_change_reference = instance.order_id
                            # Deduct from current_stock
                            product.current_stock -= item.quantity
                            product.save()

                    # Restore stock when Cancelled, Returned, Refunded
                    restored_states = ['CANCELLED', 'RETURNED', 'REFUNDED']
                    if old_status not in restored_states and new_status in restored_states:
                        # Only restore if it was previously deducted (meaning it was in a confirmed state)
                        # Or if we just blindly deduct/restore: we should only restore if it was deducted.
                        if old_status in confirmed_states:
                            reason = 'ORDER_CANCELLED' if new_status == 'CANCELLED' else 'RETURNED_ITEM'
                            for item in instance.items.all():
                                product = item.product
                                product._stock_change_reason = reason
                                product._stock_change_reference = instance.order_id
                                product.current_stock += item.quantity
                                product.save()
                                
                    # Send Email Notification
                    recipient_email = instance.user.email if instance.user else (instance.shipping_address.email if hasattr(instance.shipping_address, 'email') else None)
                    if not recipient_email and instance.shipping_address and hasattr(instance.shipping_address, 'phone'):
                        # Can't send email if we don't have it, we could send SMS here
                        pass
                        
                    if recipient_email:
                        subject = f"IndiBuzz Order {instance.order_id} Status Update: {new_status}"
                        message = f"Hello,\n\nYour order {instance.order_id} is now {new_status}.\n\nTotal Amount: ₹{instance.total_amount}\n\nThank you for shopping with IndiBuzz."
                        try:
                            send_mail(
                                subject,
                                message,
                                settings.DEFAULT_FROM_EMAIL,
                                [recipient_email],
                                fail_silently=True,
                            )
                        except Exception as e:
                            pass # Don't block order save if email fails
        except Order.DoesNotExist:
            pass
