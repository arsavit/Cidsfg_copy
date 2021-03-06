from django.db import models

# Create your models here.
from stdimage import StdImageField


class SeoAbstract(models.Model):
    """Абстрактная модель для добавления метаданных на страницу"""
    seo_title = models.CharField('SEO title', help_text='Не больше 70 символов', max_length=70, blank=True,
                                 default='CUBO')
    seo_description = models.CharField('SEO description', help_text='Не больше 150 символов', max_length=150,
                                       blank=True)
    seo_og_title = models.CharField('SEO og:title',
                                    help_text='Не больше 70 символов. Этот текст будет отображаться как подпись к ссылке',
                                    max_length=70, blank=True,
                                    null=True)
    seo_og_image = StdImageField('SEO og:image (JPEG)', upload_to='SEO/og_images',
                                 help_text='Это изображение будет отображаться как превью к ссылке',
                                 variations={
                                     'w1000': (1000, 667),
                                     'admin': (90, 60),
                                     'thumb': (15, 10),
                                 }, blank=True, null=True)

    class Meta:
        abstract = True


class SearchSystem(models.Model):
    """ Модель подключения поисковых систем """
    title = models.CharField('Название поисковой системы', help_text='Например, Yandex', max_length=255)
    name = models.CharField('Название поисковой системы в теге meta', help_text='Например, yandex-verification',
                            max_length=255)
    content = models.CharField('Код (content) в теге meta', help_text='Например, 9diffed174d3ebb8', max_length=255)
    active = models.BooleanField('Включить', default=True)

    class Meta:
        verbose_name = 'Поисковая система'
        verbose_name_plural = 'Поисковые системы'

    def __str__(self):
        return f'{self.title}'


class CounterForSite(models.Model):
    """Счечики и аналитика для сайта"""
    name = models.CharField("Имя", max_length=60, help_text="Имя счетчика")
    code = models.TextField("Код", help_text="Код счетчика или метрики")
    active = models.BooleanField("Включен", default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Счетчики и аналитика для сайта"
        verbose_name_plural = "Счетчики и аналитика для сайта"
