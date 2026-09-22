"""
Custom management command to create a superuser from environment variables.
Works reliably on Render free tier without shell access.
"""
import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create superuser from environment variables if it does not exist'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'indibuztrader')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'Sada@1993')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'indibuztrader@indibuzz.in')

        if User.objects.filter(username=username).exists():
            # Update existing user's password and ensure it's a superuser
            user = User.objects.get(username=username)
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.is_active = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Updated superuser "{username}" with new password'))
        else:
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
            )
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully'))
