"""Django settings for smart project.

Generated by 'django-admin startproject' using Django 1.11.1.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""
import os

import redis
from configurations import Configuration

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/
class Dev(Configuration):
    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY = "3m+ivzqtm6&@27jc10%w+*&ah6m%&1l)5vp%05ui1v$$y6%db7"

    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True

    ALLOWED_HOSTS = ["0.0.0.0", "localhost"]

    # Application definition

    INSTALLED_APPS = [
        "core.apps.CoreConfig",
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
        "django_extensions",
        "django_celery_results",
        "rest_framework",
        "rest_framework.authtoken",
        "rest_auth",
        "django.contrib.sites",
        "allauth",
        "allauth.account",
        "postgres_stats",
        "formtools",
        "rest_auth.registration",
        "rest_framework_swagger",
        "webpack_loader",
    ]

    MIDDLEWARE = [
        "django.middleware.security.SecurityMiddleware",
        "django.contrib.sessions.middleware.SessionMiddleware",
        "django.middleware.common.CommonMiddleware",
        "django.middleware.csrf.CsrfViewMiddleware",
        "django.contrib.auth.middleware.AuthenticationMiddleware",
        "django.contrib.messages.middleware.MessageMiddleware",
        "django.middleware.clickjacking.XFrameOptionsMiddleware",
    ]

    ROOT_URLCONF = "smart.urls"

    LOGIN_REDIRECT_URL = "/"

    TEMPLATES = [
        {
            "BACKEND": "django.template.backends.django.DjangoTemplates",
            "DIRS": [
                os.path.join(BASE_DIR, "smart", "templates"),
                os.path.join(BASE_DIR, "core", "templates"),
            ],
            "APP_DIRS": True,
            "OPTIONS": {
                "context_processors": [
                    "django.template.context_processors.debug",
                    "django.template.context_processors.request",
                    "django.contrib.auth.context_processors.auth",
                    "django.contrib.messages.context_processors.messages",
                ],
            },
        },
    ]

    # upload handlers
    # https://github.com/ouhouhsami/django-progressbarupload
    FILE_UPLOAD_HANDLERS = (
        # "progressbarupload.uploadhandler.ProgressBarUploadHandler",
        "django.core.files.uploadhandler.MemoryFileUploadHandler",
        "django.core.files.uploadhandler.TemporaryFileUploadHandler",
    )
    # PROGRESSBARUPLOAD_INCLUDE_JQUERY = True

    WSGI_APPLICATION = "smart.wsgi.application"

    # Database
    # https://docs.djangoproject.com/en/1.11/ref/settings/#databases

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "smart",
            "USER": "smart",
            "PASSWORD": "my-secret-password",
            "HOST": "postgres",
            "PORT": "5432",
        }
    }

    # Password validation
    # https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
        },
        {
            "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        },
        {
            "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
        },
        {
            "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
        },
    ]

    ACCOUNT_LOGOUT_ON_GET = True

    # Internationalization
    # https://docs.djangoproject.com/en/1.11/topics/i18n/

    LANGUAGE_CODE = "en-us"

    TIME_ZONE = "UTC"

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/1.11/howto/static-files/

    STATIC_URL = "/dist/"

    REST_FRAMEWORK = {
        "PAGE_SIZE": 10,
        "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
        "DEFAULT_AUTHENTICATION_CLASSES": (
            "rest_framework.authentication.BasicAuthentication",
            "rest_framework.authentication.SessionAuthentication",
        ),
        "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    }

    # SMART app config

    # Base directory in which to store model pickles
    DATA_DIR = "/data"
    TF_IDF_PATH = os.path.join(DATA_DIR, "tf_idf")
    MODEL_PICKLE_PATH = os.path.join(DATA_DIR, "model_pickles")
    PROJECT_FILE_PATH = os.path.join(DATA_DIR, "data_files")
    CODEBOOK_FILE_PATH = os.path.join(DATA_DIR, "code_books")

    AUTH_USER_MODEL = "auth.User"

    SITE_ID = 1

    REST_USE_JWT = True

    # This is temporary until we can get an email server setup
    # for registration emails
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

    REDIS_URL = "redis://redis:6379/0"

    # Set up a global connection pool here so we don't have to make
    # a new one every time we need to access redis
    REDIS = redis.StrictRedis.from_url(REDIS_URL)

    # CELERY SETTINGS
    CELERY_BROKER_URL = REDIS_URL
    CELERY_RESULT_BACKEND = "django-db"
    CELERY_ACCEPT_CONTENT = ["json"]
    CELERY_TASK_SERIALIZER = "json"
    CELERY_RESULT_SERIALIZER = "json"

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, "frontend", "dist"),
        os.path.join(BASE_DIR, "core/data"),
        os.path.join(BASE_DIR, "smart/static"),
        "/data/code_books/",
    ]

    WEBPACK_LOADER = {
        "DEFAULT": {
            "CACHE": not DEBUG,
            "BUNDLE_DIR_NAME": "/",
            "STATS_FILE": os.path.join(BASE_DIR, "frontend", "webpack-stats.json"),
            "POLL_INTERVAL": 0.1,
            "TIMEOUT": None,
            "IGNORE": [".+\.hot-update.js", ".+\.map"],
        }
    }

    DATA_UPLOAD_MAX_NUMBER_FIELDS = None


class Prod(Dev):
    DEBUG = False
    ALLOWED_HOSTS = []
