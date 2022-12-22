## Description

Backend - Social Wires

## Installation

```bash
$ npm install
```

## Create .env file

In order for the app to work, you must create an .env file in the root folder of the project and then fill it in following the .env.example file as a guide.

## Running the DB

Before running the API, you must start the database in docker with docker compose

```bash
# Docker compose
$ docker compose up -d
```

and now, you must run migrations in db (Create tables)

```bash
# Sequelize-cli
$ npx sequelize-cli db:migrate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
