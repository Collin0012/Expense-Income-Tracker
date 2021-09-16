from django.apps import AppConfig


class UserpreferencesConfig(AppConfig):
    name = 'userpreferences'
    
    def ready(self):
        import userpreferences.signals