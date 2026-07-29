from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Seeds the database with required RBAC groups.'

    def handle(self, *args, **kwargs):
        roles = [
            'Super Admin',
            'Store Manager',
            'Inventory Manager',
            'Marketing Manager',
            'Customer Support',
            'Customer',
        ]
        
        for role in roles:
            group, created = Group.objects.get_or_create(name=role)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created group: {role}'))
            else:
                self.stdout.write(self.style.WARNING(f'Group already exists: {role}'))
