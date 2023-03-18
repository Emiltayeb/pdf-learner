up:
	docker-compose up 
up-d:
	docker-compose up -d
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d  --build 
build:
	docker-compose -f docker-compose.yml up --build 	
down: 
	docker-compose down