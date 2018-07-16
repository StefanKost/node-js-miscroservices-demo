# Node JS microservices

Current project shows how to build web application use microservices architecture.

# Installation
1. You need to install docker compose: https://docs.docker.com/compose/install/
2. Go to the project root directory
3. Open terminal and write command:
````
docker-compose up
````
Project opens on 80 port.

# API documentation
User:
```
GET /user[?queryParams] - Get all users or get user by query
GET /user/{id} - Get user by id
POST /user - Create new user
PUT /user/{id} - Update user by id
DELETE /user/{id} - Delete user by id
```
Book:
````
GET /book[?queryParams] - Get all books or get book by query
GET /book/{id} - Get book by id
POST /book - Create new book
PUT /book/{id} - Update user by id
DELETE /user/{id} - Delete user by id
````

# How works microservices in this project?
Proxy is public microservice which get requests and send these for API Gateway service. API Gateway service redirects to User or Book microservice. When services send response then API Gateway return reply for proxy and after that the proxy microservice send answer for user.

