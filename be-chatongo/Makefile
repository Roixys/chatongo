server:
	python main.py

migrate:
	export FLASK_APP=main; flask db init; flask db migrate; flask db upgrade

format:
	black .; isort .; flake8 .

.PHONY: server migrate format
