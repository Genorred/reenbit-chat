dev-up:
	docker-compose -f docker-compose.dev.yml --env-file ./config/.env.dev up --build

dev-up-cache:
	docker-compose -f docker-compose.dev.yml --env-file ./config/.env.dev up

dev-down:
	docker-compose -f docker-compose.dev.yml --env-file ./config/.env.dev down -v --remove-orphans

prod-up:
	docker-compose -f docker-compose.yml --env-file ./config/.env up --build

prod-up-cache:
	docker-compose -f docker-compose.yml --env-file ./config/.env up

prod-down:
	docker-compose -f docker-compose.yml --env-file ./config/.env down -v --remove-orphans

