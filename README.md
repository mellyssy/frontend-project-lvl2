![Setup and run](https://github.com/mellyssy/frontend-project-lvl2/workflows/Setup%20and%20run/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/b155d4bcab7d10b424fd/maintainability)](https://codeclimate.com/github/mellyssy/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b155d4bcab7d10b424fd/test_coverage)](https://codeclimate.com/github/mellyssy/frontend-project-lvl2/test_coverage)

# Вычислитель отличий

Учебный проект второго уровня от [Hexlet](https://ru.hexlet.io/professions/frontend/projects/46).

cli-приложение для поиска отличий в файлах yaml, json, ini. Генерация отчёта в форматах: plain text, pretty и json.

Пример использования:

```
$ gendiff before.yml after.yml

{
  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}
```