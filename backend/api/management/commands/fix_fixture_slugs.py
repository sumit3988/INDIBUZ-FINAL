import json
import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Fixes missing slugs in the products JSON fixture by auto-generating unique slugs from product names.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--fixture',
            type=str,
            default='api/fixtures/products_fixed.json',
            help='Path to the JSON fixture file'
        )

    def handle(self, *args, **options):
        fixture_path = options['fixture']
        
        if not os.path.exists(fixture_path):
            self.stdout.write(self.style.ERROR(f'Fixture file not found: {fixture_path}'))
            return

        with open(fixture_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError as e:
                self.stdout.write(self.style.ERROR(f'Invalid JSON in fixture: {e}'))
                return

        used_slugs = set()
        modified_count = 0

        # First pass: Collect all existing valid slugs to ensure uniqueness
        for item in data:
            if item.get('model') == 'api.product':
                fields = item.get('fields', {})
                slug = fields.get('slug')
                if slug:
                    used_slugs.add(slug)

        # Second pass: Generate slugs for products missing them
        for item in data:
            if item.get('model') == 'api.product':
                fields = item.get('fields', {})
                
                # If slug is missing or empty
                if not fields.get('slug'):
                    name = fields.get('name', '')
                    if not name:
                        continue
                        
                    base_slug = slugify(name)
                    slug = base_slug
                    counter = 1
                    
                    # Ensure uniqueness
                    while slug in used_slugs:
                        slug = f"{base_slug}-{counter}"
                        counter += 1
                        
                    fields['slug'] = slug
                    used_slugs.add(slug)
                    modified_count += 1

        if modified_count > 0:
            with open(fixture_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
            self.stdout.write(self.style.SUCCESS(f'Successfully generated {modified_count} missing slugs in {fixture_path}'))
        else:
            self.stdout.write(self.style.SUCCESS('No missing slugs found. Fixture is already correct.'))
