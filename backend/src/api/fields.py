from django.conf import settings
from rest_framework import fields


class RelativeMediaImageField(fields.ImageField):
    def to_representation(self, value):
        if not value:
            return None
        return settings.MEDIA_URL.rstrip('/') + '/' + value.name
