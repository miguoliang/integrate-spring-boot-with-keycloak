# A Sample of Spring Boot 3.3.1 with Keycloak 25.0.1

This is a sample project to demonstrate how to integrate Spring Boot 3.3.1 with Keycloak 25.0.1. Besides a simple web application using `oidc-client-ts` to authenticate with Keycloak.

This is only a sample project, so it may not be suitable for production use. For production use, you should consider the following:

- Use HTTPS for all communication.
- Use a production-ready Keycloak server.
- Use a production-ready database.
- Use a production-ready web server.
- More complex security configurations.

## Technologies

- [Spring Boot 3.3.1](https://spring.io/projects/spring-boot)
- [Keycloak 25.0.1](https://www.keycloak.org/)
- [oidc-client-ts](https://authts.github.io/oidc-client-ts/)

## How to run

1. Start Keycloak server by running `docker compose up -d` in the project's root directory.
2. Start the Spring Boot application by running `./mvnw bootRun` in the project's root directory.
3. Install the dependencies for the web application by running `npm install` in the `web` directory.
4. Start the web application by running `npm run dev` in the `web` directory.