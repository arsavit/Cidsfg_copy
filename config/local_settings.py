import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True

ALLOWED_HOSTS = ["*"]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:63342',
    'http://localhost:63342',
]

STATIC_URL = 'frontend/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'frontend/static')
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/static')]
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/static'),
                    os.path.join(BASE_DIR, 'frontend/static_new')]

# STATIC_ROOT = os.path.join(BASE_DIR, 'frontend/static')


INSTALLED_APPS_LOCAL = [
    'silk',
    'django_extensions',
]

MIDDLEWARE_LOCAL = [
    'silk.middleware.SilkyMiddleware',
]
