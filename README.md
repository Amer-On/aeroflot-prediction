# Aeroflot Prediction by PinCode | Penguin Code
```Host:``` https://penguin-code.ru/


Решение команды Penguin Code в рамках хакатона Лидеры Цифровой Трансформации 2023 по *Задаче 13 "Рекомендательный сервис динамического прогнозирования спроса на авиарейсы"*

В Рамках задачи мы разработали веб-сервис для анализа спроса и его прогнозирования.
---
## Стэк технологий
### [```Frontend```](https://github.com/Amer-On/aeroflot-prediction/tree/main/frontend?plain=1#readme)
- React
### [```Backend```](https://github.com/Amer-On/aeroflot-prediction/tree/main/backend?plain=1#readme)
- Fastapi
- asyncpg
### ```Database```
- PostgreSQL 12, хост на отдельном сервере RDS SberCloud
### [```ML/Data Science```](https://github.com/Amer-On/aeroflot-prediction/tree/main/ml?plain=1#readme)
- statsmodels для статистического анализа
- catboost в качестве модели для предсказания спроса
- pandas, numpy, pyplot etc
### [```Devops```](https://github.com/Amer-On/aeroflot-prediction/tree/main/deploy?plain=1#readme)
- nginx в качестве обратного прокси сервера
- certbot для подписи ssl сертификата
- uvicorn в качестве ASGI сервера
- npm serve сервер для фронтенда

## Об архитектуре
Архитектура приложения подразумевает собой возможность масштабирования, деления на микросервиса и дальнейшее развитие. Приложение способно выдерживать большие нагрузки и быстро обрабатывать данные (как благодаря мощному серверу от Sber Cloud, так и благодаря хорошему стеку, оптимизации работы с базой данных)

## Приватность
Мы позаботились о том, чтобы не у всех был доступ к сервису, чтобы данные оставались конфиденциальными. Мы реализовали JWT авторизацию и создали super user'a с возможностью создавать новых пользователей через API.
Для тестирования функционала сервера предоставляем логин и пароль зарегистрированного пользователя (not super user)
```
login: test
password: test
```
