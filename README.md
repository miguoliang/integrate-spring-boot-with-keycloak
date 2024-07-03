# A Sample of Spring Boot 3.3.1 with Keycloak 25.0.1

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Technologies](#technologies)
- [How to run](#how-to-run)
- [Accessing the applications](#accessing-the-applications)
- [Source code you may want to check](#source-code-you-may-want-to-check)
- [License](#license)

## Introduction

This is a sample project to demonstrate how to integrate Spring Boot 3.3.1 with Keycloak 25.0.1. Besides a simple web application using `oidc-client-ts` to authenticate with Keycloak.

This is only a sample project, so it may not be suitable for production use. For production use, you should consider the following:

- Use HTTPS for all communication.
- Use a production-ready Keycloak server.
- Use a production-ready database.
- Use a production-ready web server.
- More complex security configurations.

## Why Keycloak?

- Keycloak is an open-source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code. It provides a variety of features, such as Single Sign-On (SSO), Social Login, User Federation, and more.

- You never need to create and manage user accounts in your application, as Keycloak handles it for you. You can also integrate Keycloak with external identity providers, such as Google, Facebook, and more, making it easy to provide social login in your application.

- You never need to implement the authentication and authorization logic in your application, as Keycloak handles it for you.

- You never need to generate and manage user credentials in your application, as Keycloak handles it for you. You can also integrate Keycloak with external identity providers, such as Google, Facebook, and more, making it easy to provide social login in your application.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)

## Technologies

- [Spring Boot 3.3.1](https://spring.io/projects/spring-boot)
- [Keycloak 25.0.1](https://www.keycloak.org/)
- [React 18](https://react.dev/)
- [OpenID Connect](https://openid.net/connect/)
- [oidc-client-ts](https://authts.github.io/oidc-client-ts/)

## How to run

1. Start Keycloak server by running `docker compose up -d` in the project's root directory.
2. Start the Spring Boot application by running `./mvnw bootRun` in the project's root directory.
3. Install the dependencies for the web application by running `npm install` in the `web` directory.
4. Start the web application by running `npm run dev` in the `web` directory.

## Accessing the applications

- The web application will be available at [http://localhost:5173](http://localhost:5173).
- The Keycloak server will be available at [http://localhost:8080](http://localhost:8080). The default username and password for Keycloak are `admin` and `admin`. 
- The Spring boot application will be available at [http://localhost:8081](http://localhost:8081), and the only endpoint is `/hello` accepting a `GET` request.

## Source code you may want to check

- [Keycloak configuration](./src/main/resources/application.properties)
- [Spring Security configuration](./src/main/java/com/example/demo/WebSecurityConfig.java)
- [OIDC client configuration](./web/src/oidc.config.ts)
- [React component using OIDC client](./web/src/App.tsx)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
