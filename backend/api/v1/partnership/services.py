import requests
from loguru import logger

from config.settings import TG_BOT_TOKEN, TG_ADMIN_ID, SITE_DOMAIN, ADMIN_URL


def send_message_to_admin(message, admin_id=TG_ADMIN_ID):
    """ Отправляем сообщение в телеграм"""

    response = requests.get(
        f'https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage?chat_id={admin_id}&text={message}&parse_mode=HTML',
        data={'key': 'value'})
    logger.info(response)
    logger.info(response.json())


def send_notification(data, admin_id=TG_ADMIN_ID):
    """Отправляем уведомление о новом сообщении со страницы Контакты"""
    message = f"""
Новая заявка на сотрудничество № {data['id']}!
Область деятельности: {data['area_of_activity']}
Частное лицо/Компания: {data['company_type']}
Название компании: {data['company_name']}
Имя пользователя: {data['firs_name']}
Фамилия пользователя: {data['last_name']}
E-mail пользователя: {data['email']}
Номер телефона пользователя: {data['phone_number']}
<a href="{SITE_DOMAIN}/{ADMIN_URL}/partnership/cooperationapplication/{data['id']}/change/">Посмотреть в панели администратора</a>
"""
    send_message_to_admin(message, admin_id)