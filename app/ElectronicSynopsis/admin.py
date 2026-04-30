from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models

from ElectronicSynopsis.models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ['username', 'is_admin']

    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("is_admin", 'avatar')}),)


class SectionAdmin(admin.ModelAdmin):

    model = models.Section

    list_display = ['user', 'title']


class ItemAdmin(admin.ModelAdmin):

    model = models.Item

    list_display = ["section", 'title']


class DataAdmin(admin.ModelAdmin):

    model = models.Data

    list_display = ["item", 'order_id', 'type']


class AttachmentAdmin(admin.ModelAdmin):

    model = models.Attachment

    list_display = ["counter"]


class UserIconAdmin(admin.ModelAdmin):

    model = models.UserIcon

    list_display = ["attach_id", "user", "name"]


class KeysAdmin(admin.ModelAdmin):
    model = models.Keys

    list_display = ["pk"]


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(models.Section, SectionAdmin)
admin.site.register(models.Item, ItemAdmin)
admin.site.register(models.Data, DataAdmin)
admin.site.register(models.Attachment, AttachmentAdmin)
admin.site.register(models.UserIcon, UserIconAdmin)
admin.site.register(models.Keys, KeysAdmin)
