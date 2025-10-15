# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.3.0 (2025-10-15)


### Features

* **terraform:** add EC2 instances and security group configuration ([b5a9ae1](https://github.com/NicolasDrp/mon-forum-anonyme/commit/b5a9ae1d317f2b0b6615adc5f2bda9574160ca7a))

### 1.2.4 (2025-10-15)

### 1.2.3 (2025-05-12)

### 1.2.2 (2025-05-12)

### 1.2.1 (2025-05-12)

## 1.2.0 (2025-05-12)


### Features

* add a test script to package.json for sender and thread ([a59e272](https://github.com/NicolasDrp/mon-forum-anonyme/commit/a59e27232abd3fd8c9d19d644d0f57977194ab60))

### 1.1.5 (2025-05-12)

### 1.1.4 (2025-05-12)

### 1.1.3 (2025-05-12)

### 1.1.2 (2025-05-12)

### 1.1.1 (2025-05-12)

## 1.1.0 (2025-05-11)


### Features

* add conventional commit ([1886d4c](https://github.com/NicolasDrp/mon-forum-anonyme/commit/1886d4c6d8a93561a751d79d40e00d19004d7faf))
* **api:** initialize NestJS application with basic structure and tests ([292129a](https://github.com/NicolasDrp/mon-forum-anonyme/commit/292129ad7bc29addadde5df0b905c8a35772a4d7))
* **api:** integrate TypeORM with PostgreSQL and add Swagger documentation to the main.ts file ([528fa75](https://github.com/NicolasDrp/mon-forum-anonyme/commit/528fa756e4bd3bc925d3887d9b328d4f675df938))
* **config:** add configuration for PostgreSQL and integrate @nestjs/config module ([61cfa1f](https://github.com/NicolasDrp/mon-forum-anonyme/commit/61cfa1f39000d474c7b98c06bc4076f18e708041))
* **docker:** add Dockerfile for api and sender services with configurations ([7419495](https://github.com/NicolasDrp/mon-forum-anonyme/commit/7419495f1e6bf2a1b250d7c0e084bf736719f460))
* **docker:** add healthcheck for db service ([bfe6492](https://github.com/NicolasDrp/mon-forum-anonyme/commit/bfe64928a02885fffc2e448cbc09e3466fe2fb13))
* **env:** create .env and .env.example files for database and API configuration ([26ad368](https://github.com/NicolasDrp/mon-forum-anonyme/commit/26ad368cdf6b55500920bff58556d8020645449e))
* **message:** add sender and content properties to UpdateMessageDto Swagger documentation ([647be8b](https://github.com/NicolasDrp/mon-forum-anonyme/commit/647be8bda50e05f33598090a41081b2a930bf52e))
* **message:** add User entity and update Message entity to reference User(sender) ([8f641be](https://github.com/NicolasDrp/mon-forum-anonyme/commit/8f641bee369cc4993d070208a6405d49d1e68f53))
* **message:** implement message CRUD functionality with DTOs and controller ([ed47a51](https://github.com/NicolasDrp/mon-forum-anonyme/commit/ed47a510a7a65978ff1d6ca50893b83ae5793b61))
* **sender:** initialize sender service with Express and static file serving ([8fa823c](https://github.com/NicolasDrp/mon-forum-anonyme/commit/8fa823c61a4f55c1867da9768e00fdfdd45ea0b2))
* **thread:** add thread service for message retrieval with Express ([9ebeacc](https://github.com/NicolasDrp/mon-forum-anonyme/commit/9ebeacc4cc881eab9e0f633fdbd337a659287a67))


### Bug Fixes

* **eslint:** add rule in the eslint configuration to avoid the "Delete CR" error ([2f30d4b](https://github.com/NicolasDrp/mon-forum-anonyme/commit/2f30d4bfea233af1159331d80de5bcb1ad014023))
