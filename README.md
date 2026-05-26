### Hexlet tests and linter status:
[![Actions Status](https://github.com/GromoZeus/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/GromoZeus/frontend-project-46/actions)

### Test and linter status:
[![Actions Status](https://github.com/GromoZeus/frontend-project-46/actions/workflows/test_lint-check.yml/badge.svg)](https://github.com/GromoZeus/frontend-project-46/actions)

# ⚙️ Вычислитель отличий

## 📖 Описание проекта

Вычислитель отличий — консольное приложение, представляющее из себя программу, которая определяет разницу между двумя структурами данных.
Утилита поддерживает входные форматы YAML и JSON, парсит и обрабатывает данные из них и выводит результат.

#### [Demo Link](https://asciinema.org/a/HtANuJhtJG2QYchOR7CoYbJ7U)

## 🛠️ Стек:

- **JavaScript**
- **Lodash**
- **Commander**
- **Fs**
- **Process**

## ⚙️ Как установить

1. ✅ Убедитесь, что установлена **Node.js** версии 23 или выше.
2. 📦 Клонируйте репозиторий:
   
   `git clone git@github.com:GromoZeus/frontend-project-46.git`

3. 📂 Перейдите в директорию проекта:

   `cd frontend-project-46`

4. 📥 Установите пакеты:

   `make install`
   
   `npm link`

## 📖 Использование

| Действие | Команда |
|----------|---------|
| 🆘 Получить справку | `gendiff -h` |
| 📌 Узнать версию | `gendiff -V` |
| 🔍 Сравнить два файла | `gendiff <путь к файлу1> <путь к файлу2>` |
| 🎨 Выбрать формат вывода | `gendiff --format plain <путь к файлу1> <путь к файлу2>` |
