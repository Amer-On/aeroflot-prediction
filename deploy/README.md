# Развёртывание приложения
Процесс настройки сервера описан для Ubuntu22.04, на котором и производилась развертка нашего веб-приложения.
Мы использовали предоставленные в рамках хакатона ресурсы для аренды ECS у SberCloud.
На отдельном RDS сервере мы развернули базу данных PostgreSQL 12
---
## Сама развертка происходит через Github
Репозиторий клонируется в директорию /home/projects/
```console
mkdir /home/projects
cd /home/projects
git clone https://github.com/Amer-On/aeroflot-prediction
```
В случае, если репозиторий приватный, то дополнительно нужно создать и настроить деплой через ssh
---
## Установка необходимых пакетов
Скрипт server_setup.sh устанавливает все необходимые пакеты:
- Python3.11
- NodeJS
- npm
- npx
- nginx
- redis
- certbot
А также генерирует и устанавливает локализацию en_US.UTF-8
~NOTE~: при необходимости нужно будет обновить ядро
Кроме того будут добавлены некоторые простые alias’ы для более удобной работы с сервером
---
## NGINX
Мы используем веб-сервер nginx для отдачи собранного React приложения в один html файл, а также в качестве обратного прокси сервера для перенаправления запросов на локально поднятый API через ASGI Uvicorn
> Сборка фронтенда и запуск бэкэнда описана в директориях frontend и backend соответственно. Для корректной работы фронт должен быть собран и бэкэнд запущен

### NGINX без SSL
Нужно модифицировать скрипт nginx-nossl.conf.  Изменить параметры директивы `server_name ` на ip адресс сервера/имеющееся доменное имя с настроенными записями
Скрипт nginx-nossl.conf копируется в директорию /etc/nginx/sites-available и изменяется его название
```console
cp /home/projects/aeroflot-prediction/deploy/nginx-nossl.conf /etc/nginx/sites-available/penguin-code.conf
```
После этого нужно модифицировать главный конфиг nginx. Нужно добавить строку `include sites-available/penguin-code.conf;` в директиву http ближе к началу. Остальные изменения в конфиге производятся опционально.
Также конфиг можно просто заменить уже готовым конфигом nginx.conf
```console
rm /etc/nginx/nginx.conf
cp /home/projects/aeroflot-prediction/deploy/nginx.conf /etc/nginx/nginx.conf
```
После всех манипуляций нужно применить изменения
```console
nginx -s reload
```

### NGINX with ssl
Если ssl сертификат уже есть, то нужно будет заменить параметры директив     `ssl_certificate `  и  `ssl_certificate_key `  в файле nginx-ssl.conf путями на файлы fullchain.pem и privkey.pem имеющегося ssl сертификата, затем изменить параметры директивы `server_name ` на имеющееся доменное имя с настроенными записями
Если ssl сертификата нет, то нужно модифицировать скрипт nginx-nossl.conf.  Изменить параметры директивы `server_name ` на имеющееся доменное имя с настроенными записями

Скрипт nginx-ssl.conf нужно скопировать в директорию /etc/nginx/sites-available
Далее конфиг нужно переместить в директорию /etc/nginx/sites-available
```console
# if has ssl
cp /home/projects/aeroflot-prediction/deploy/nginx-ssl.conf /etc/nginx/sites-available/penguin-code.conf

# if no ssl
cp /home/projects/aeroflot-prediction/deploy/nginx-nossl.conf /etc/nginx/sites-available/penguin-code.conf
```
После этого нужно модифицировать главный конфиг nginx. Нужно добавить строку `include sites-available/penguin-code.conf;` в директиву http ближе к началу. Остальные изменения в конфиге производятся опционально.
Также конфиг можно просто заменить уже готовым конфигом nginx.conf
```console
rm /etc/nginx/nginx.conf
cp /home/projects/aeroflot-prediction/deploy/nginx.conf /etc/nginx/nginx.conf
```
Далее при отсутствии готового SSL сертификата нужно его подписать
```console
sudo certbot --nginx -d example.com -d www.example.com
# example.com заменить на доменное имя
```
После всех манипуляций нужно применить изменения
```console
nginx -s reload
```
