# Вычислитель отличий

Учебный проект второго уровня от [Hexlet](https://ru.hexlet.io/professions/frontend/projects/46).

cli-приложение для поиска отличий в файлах yaml, json, ini. Генерация отчёта в форматах: plain text, pretty и json.

Пример использования:

```$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```