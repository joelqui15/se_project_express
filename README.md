# WTWR (What to Wear?): Back End

WTWR (What to Wear?) is a full-stack web application that helps users organize their clothing based on weather conditions.

This back-end project focuses on developing the server-side functionality for the WTWR application. It includes building a RESTful API, managing data with MongoDB, implementing user authentication and authorization, validating incoming requests, and handling errors securely.

The application is deployed using Google Cloud Platform (GCP), allowing users to access it online.

## Running the Project

- `npm run start` — Launches the server.
- `npm run dev` — Launches the server with hot reload enabled.
- `npm run lint` — Runs ESLint to check code quality.

## Functionality

- User registration and authentication.
- Secure login using JSON Web Tokens (JWT).
- User logout.
- Updating user profiles (name and avatar).
- Creating and deleting clothing items.
- Liking and unliking clothing items.
- Displaying clothing items based on weather conditions.
- User authorization and protected routes.
- MongoDB database integration.
- Server-side request validation.
- Centralized error handling.
- Request and error logging.
- Automatic server recovery using PM2.
- Secure HTTPS communication.

## Technologies Used

### Backend

- **Node.js** — JavaScript runtime environment.
- **Express.js** — Framework for building RESTful APIs.
- **MongoDB** — NoSQL database for storing application data.
- **Mongoose** — MongoDB object modeling and schema validation.

### Authentication & Security

- **bcryptjs** — Secure password hashing.
- **JSON Web Tokens (JWT)** — User authentication and authorization.
- **Celebrate & Joi** — Server-side request validation.
- **Validator.js** — Validation of URLs and email addresses.
- **CORS** — Cross-origin resource sharing.
- **dotenv** — Management of environment variables.

### Error Handling & Logging

- **Winston** — Logging HTTP requests, responses, and errors.
- **Express Middleware** — Centralized error handling.
- **Custom Error Classes** — Handling HTTP errors with appropriate status codes.

### Cloud Deployment

- **Google Cloud Platform (GCP)** — Cloud infrastructure hosting.
- **Google Compute Engine** — Virtual machine hosting the application.
- **Nginx** — Web server and reverse proxy.
- **PM2** — Node.js process management and automatic crash recovery.
- **HTTPS/SSL** — Secure communication between clients and the server.
- **SSH** — Secure remote access to the cloud server.

### Development Tools

- **Git & GitHub** — Version control.
- **ESLint** — Code quality and consistency.
- **Prettier** — Code formatting.
- **Nodemon** — Automatic server restarting during development.

## Deployment

The WTWR application is deployed on Google Cloud Platform using a Google Compute Engine virtual machine.

The backend runs as a Node.js application managed by PM2. Nginx acts as a reverse proxy, directing incoming API requests to the Express server.

HTTPS is configured to provide encrypted communication between the application and its users.

### Live Application

https://www.gcp-wtwr-demo.jumpingcrab.com

### Backend API

https://api.gcp-wtwr-demo.jumpingcrab.com

### Root Domain

https://gcp-wtwr-demo.jumpingcrab.com

## GitHub Repositories

### Frontend Repository

https://github.com/joelqui15/WTWR-APP-REACT

## Project Demonstrations

### Previous Project Overview

https://drive.google.com/file/d/1pELXNZ1ntpB7axllFhX_kkhuAb1cIa2G/view?usp=sharing

### Updated Project Overview

https://drive.google.com/file/d/1OYLxQ9VE6-6RJVD8k2HRdLLcUxagZwFq/view?usp=drive_link

### Sprint 15 — Full-Stack Project Pitch

Video demonstration:

This demonstration covers the completed WTWR full-stack application, including frontend functionality, backend development, authentication, database integration, and cloud deployment.
