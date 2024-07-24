# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, '/home/a/aosipo14/aosipo14.beget.tech-76/django_ters')
sys.path.insert(1, '/home/a/aosipo14/aosipo14.beget.tech-76/venv/lib/python3.10/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'django_ters.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
