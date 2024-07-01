<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Test

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## NestJS CLI Commands

NestJS provides a powerful CLI to help you create and manage your project, commands used in this project:

```bash
# generate a new controller
nest g controller <controller-name>

# generate a new module
nest g module <module-name>

# generate a new service
nest g service <service-name>
```

#### Additional CLI Commands

```bash
# generate a new resource (controller, module, service, and dto)
nest g resource <resource-name>

# generate a new interceptor
nest g interceptor <interceptor-name>

# generate a new pipe
nest g pipe <pipe-name>

# generate a new guard
nest g guard <guard-name>
```

## Project Structure

```
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── books/
    ├── books.controller.spec.ts
    ├── books.controller.ts
    ├── books.module.ts
    ├── books.service.spec.ts
    ├── books.service.ts
    └── books.ts
```

### Example Requests

```bash
# Hello World
GET http://localhost:3000

# Get all books
GET http://localhost:3000/books

# Get a specific book
GET http://localhost:3000/books/1

# Get a specific book in search
GET http://localhost:3000/books/search?id=1

# Add a book
POST http://localhost:3000/books/add-book

# Update book contents
PUT http://localhost:3000/books/update-book/:id

# Delete a book
DELETE http://localhost:3000/books/delete-book/:id
```
