# Биология · ЦТ

Тренажёры и генераторы задач для подготовки к ЦТ по биологии.
Сайт: https://tutorchembio.github.io/bio/

## Структура

```
index.html               каталог (данные — блок #catalog-data)
manifest.webmanifest     установка на телефон
sw.js                    офлайн-режим (список страниц PRECACHE, VERSION)
assets/                  иконки платформы
apps/<id>/index.html     одно приложение = одна самодостаточная страница
```

## Как добавить приложение

1. Положить страницу в `apps/<APP.id>/index.html` (шапка `<head>` — как у `apps/chromosome-set/`, `APP.catalogUrl = "../../"`).
2. Добавить карточку в `#catalog-data` в `index.html`.
3. Дописать `./apps/<id>/` в `PRECACHE` в `sw.js` и поднять `VERSION`.

Правила оформления и кода — «Стандарт платформы» (проект Tutor apps в Claude).
