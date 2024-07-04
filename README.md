# A Sample of Spring Boot 3.3.1 with Keycloak 25.0.1

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Technologies](#technologies)
- [How to run](#how-to-run)
  - [Web application](#web-application)
  - [VSCode extension](#vscode-extension)
  - [IntelliJ IDEA extension](#intellij-idea-extension)
- [Accessing the applications](#accessing-the-applications)
- [Source code you may want to check](#source-code-you-may-want-to-check)
- [License](#license)

## Introduction

This is a sample project to demonstrate how to integrate Spring Boot 3.3.1 with Keycloak 25.0.1. The project consists of three components:

- A Spring Boot application that provides a RESTful API.
- A Keycloak server that provides authentication and authorization services.
- A web application that uses the `oidc-client-ts` to authenticate users with Keycloak in Standard Flow.
- A VSCode extension that uses the `openid-client` to authenticate users with Keycloak in Standard Flow.
- A IntelliJ IDEA extension that uses the Apache HttpClient to authenticate users with Keycloak in OAuth 2.0 Device Authorization Grant Flow inspiration of GitHub Copilot plugin.

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
- [openid-client](https://github.com/panva/node-openid-client)
- [Apache HttpClient](https://hc.apache.org/httpcomponents-client-5.3.x/index.html)

## Accessing the applications

- The web application will be available at [http://localhost:5173](http://localhost:5173).
- The Keycloak server will be available at [http://localhost:8080](http://localhost:8080). The default username and password for Keycloak are `admin` and `admin`.
- The Spring boot application will be available at [http://localhost:8081](http://localhost:8081), and the only endpoint is `/hello` accepting a `GET` request.

## How to run

1. Start Keycloak server by running `docker compose up -d` in the project's root directory.
2. Start the Spring Boot application by running `./mvnw bootRun` in the project's root directory.

### Web application

1. Install the dependencies for the web application by running `npm install` in the `web` directory.
2. Start the web application by running `npm run dev` in the `web` directory.
3. Open [http://localhost:5173](http://localhost:5173) in a browser.
4. Click on the `Login` button to log in.
5. After logging in, you will see the login button change to a logout button with a username.
6. Click on the `Logout` button to log out.

### VSCode extension

1. Install the dependencies for the VSCode extension by running `npm install` in the `vscode-extension-sample` directory.
2. Start the VSCode extension by running `npm run watch` in the `vscode-extension-sample` directory.
3. Press `Ctrl+Shift+P` to open the command palette, then type `Keycloak Login` and press `Enter`.
4. A browser window will open, and you will be redirected to the Keycloak server to log in.
5. After logging in, you will be redirected back to the VSCode extension, and you will see a message saying that you are logged in.

### IntelliJ IDEA extension

1. Install the dependencies for the IntelliJ IDEA extension by running `./gradlew build` in the `intellij-plugin-sample` directory.
2. Start the IntelliJ IDEA extension by running `./gradlew runIde` in the `intellij-plugin-sample` directory.
3. Find the `Keycloak OIDC Login` action in the `Tools` menu and click on it.
4. A dialog with a link will appear. Open the link in a browser.
5. Log in to the Keycloak server.
6. After logging in, you will see a message saying that you are logged in.
7. Press `OK` to close the dialog.
8. You will see the access token in a new dialog.

## Source code you may want to check

- [Keycloak configuration](./src/main/resources/application.properties)
- [Spring Security configuration](./src/main/java/com/example/demo/WebSecurityConfig.java)
- [OIDC client configuration](./web/src/oidc.config.ts)
- [React component using OIDC client](./web/src/App.tsx)
- [VSCode extension using OIDC client](./vscode-extension-sample/src/extension.ts)
- [IntelliJ IDEA extension using Apache HttpClient](./intellij-plugin-sample/src/main/kotlin/com/example/intellijpluginsample/KeycloakLoginAction.kt)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
