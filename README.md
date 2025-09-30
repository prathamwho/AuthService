cat << 'EOF' > README.md

# User Authentication and Role Management Service

A robust backend service for user authentication, authorization, and role-based access control (RBAC), built with Node.js, Express, and Sequelize.

---

## Features

- **User Registration:** Securely sign up new users.
- **User Sign-In:** Authenticate users with email and password.
- **JWT-Based Authentication:** Uses JSON Web Tokens (JWT) for managing user sessions.
- **Password Hashing:** Automatically hashes user passwords using `bcrypt` for secure storage.
- **Role-Based Access Control:** Assign roles to users (e.g., ADMIN, CUSTOMER) to manage permissions.
- **Middleware Validations:** Pre-validates incoming requests to ensure required data is present.

---

## Project Setup

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- A SQL-based database like [MySQL](https://www.mysql.com/) or PostgreSQL.

### 2. Installation

- Clone the project repository:
  ```bash
  git clone <your-repository-url>
  ```
- Navigate to the project's root directory:
  ```bash
  cd <project-directory-name>
  ```
- Install all the required npm packages:
  ```bash
  npm install
  ```

### 3. Environment Configuration

- Create a `.env` file in the root directory. Add the following environment variables, replacing `<YOUR_SECRET_KEY>` with a long, random, and secret string.

  ```env
  PORT=3000
  JWT_KEY=<YOUR_SECRET_KEY>
  ```

- Inside the `config` folder, create a new file named `config.json` and add the following JSON. Replace the placeholders with your actual database credentials.

  ```json
  {
    "development": {
      "username": "<YOUR_DB_USERNAME>",
      "password": "<YOUR_DB_PASSWORD>",
      "database": "Auth_Service_DB_DEV",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```

### 4. Database Setup

- From the project's root folder in your terminal, run the following commands to set up your database, tables, and initial roles.

- Create the database:
  ```bash
  npx sequelize db:create
  ```
- Run the database migrations to create the `Users` and `Roles` tables:
  ```bash
  npx sequelize db:migrate
  ```
- Run the seeder to populate the `Roles` table with default values (ADMIN, CUSTOMER, AIRLINE_BUSINESS):
  ```bash
  npx sequelize db:seed:all
  ```

### 5. Running the Server

- Start the server (this will typically use `nodemon` for development if configured in `package.json`):
  ```bash
  npm start
  ```
- The server should now be running on the port specified in your `.env` file (e.g., `http://localhost:3000`).

---

## API Endpoints

The service exposes the following RESTful API endpoints, prefixed with `/api/v1`.

| Method | Endpoint           | Description                                           | Request Body (JSON)               | Headers                 |
| :----- | :----------------- | :---------------------------------------------------- | :-------------------------------- | :---------------------- |
| `POST` | `/signup`          | Registers a new user.                                 | `{ "email": "", "password": "" }` | -                       |
| `POST` | `/signin`          | Authenticates a user and returns a JWT.               | `{ "email": "", "password": "" }` | -                       |
| `GET`  | `/isAuthenticated` | Verifies the validity of a JWT.                       | -                                 | `x-access-token`: <JWT> |
| `GET`  | `/isAdmin`         | Checks if the user associated with an ID is an admin. | `{ "id": 1 }`                     | -                       |

---

## Database Design

### Many-to-Many Relationship: Users and Roles

This project implements a **many-to-many** relationship between `Users` and `Roles`. This design is highly flexible and allows for a robust permissions system:

- A single `User` can be assigned multiple `Roles` (e.g., a user can be both an `ADMIN` and a `CUSTOMER`).
- A single `Role` can be assigned to many different `Users`.

Sequelize manages this relationship through a third table, known as a **junction table** or **join table**, which is automatically created and named `User_Roles`. This table stores pairs of `userId` and `roleId`, effectively linking the two models.
