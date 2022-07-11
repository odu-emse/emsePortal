up-dev:
	docker-compose up ui-dev

up-local:
	docker-compose up ui-local

down:
	docker-compose down

build-dev:
	docker-compose build ui-dev

build-local:
	docker-compose build ui-local

rm-dev:
	make down
	docker rmi emseportal_ui-dev

rm-local:
	make down
	docker rmi emseportal_ui-local

rncn:
	docker ps -a

img:
	docker image ls

enter-dev:
	docker exec -it emse_ui_dev bash

enter-local:
	docker exec -it emse_ui_local bash

nocache-dev:
	docker-compose build ui-dev --no-cache

nocache-local:
	docker-compose build ui-local --no-cache

reup-local:
	make remvimg-local
	make nocache-local
	make up-local

reup-dev:
	make rm-dev
	make nocache-dev
	make up-dev

prune:
	docker system prune --all