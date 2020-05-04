from django.contrib import admin


from authentication import models


class CustomUserAdmin(admin.ModelAdmin):
    model = models.CustomUser


admin.site.register(models.CustomUser, CustomUserAdmin)
