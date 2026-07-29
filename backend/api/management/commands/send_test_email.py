from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings

class Command(BaseCommand):
    help = 'Sends a test email to verify SMTP configuration'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='The email address to send the test email to')

    def handle(self, *args, **kwargs):
        recipient_email = kwargs['email']
        subject = 'Test Email from IndiBuzz'
        message = 'Congratulations! Your SMTP configuration is working perfectly.'
        
        self.stdout.write(f"Sending test email to {recipient_email} using {settings.EMAIL_HOST}...")
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [recipient_email],
                fail_silently=False,
            )
            self.stdout.write(self.style.SUCCESS('Successfully sent test email!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to send email: {e}'))
