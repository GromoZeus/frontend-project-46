install: # установка зависимостей
	npm ci

lint: # проверка кода
	npx eslint .

publish: # публикация пакета
	npm publish --dry-run
	
test: # запуск тестов
	npm test