prod-up:
	docker-compose -f docker-compose.yml --env-file .env up --build

prod-up-cache:
	docker-compose -f docker-compose.yml --env-file .env up

prod-down:
	docker-compose -f docker-compose.yml --env-file .env down -v --remove-orphans

