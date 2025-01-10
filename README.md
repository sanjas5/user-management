# User Management Application

---

## Overview

This project consists of two main parts: a **backend** built with **NestJS** (Node.js) and a **frontend** built with **ReactJS**. The goal is to implement a **User Management API** that allows for basic user operations (CRUD) and a frontend interface to interact with this API. The backend uses a PostgreSQL database and includes various API endpoints for managing users.

### Features

- **User Listing**: Displays all users in a paginated list.
- **Add User**: A form to create a new user.
- **Edit User**: A form to update an existing user's details.
- **Delete User**: Option to delete a user from the database.

### UI Components

1. **User List**:

   - Displays a list of users with their names, emails, and phone numbers.
   - Includes pagination for navigating through multiple pages of users.

2. **Create New User**:

   - A form that takes user input (first name, last name, email, phone number) and sends a POST request to create a new user.

3. **Edit User**:

   - A form to edit an existing user's details.
   - Allows the user to change first name, last name, email, and phone number.

4. **Delete User**:
   - Each user in the list has a "Delete" button to remove the user from the system.

---

## Technical requirements

- **Nest Version**: 21.7.1
- **React Version**: 18.3.1
- **Typescript Version**: 5.7.3
- **Routing**: React Router
- **Testing**: React Testing Library, Jest

### Backend:

- **Typescript**: Strongly typed language for backend development
- **NestJS** with Typescript
- **PostgreSQL Database** (hosted on ElephantSQL)
- **RESTful API** with the following endpoints:
  - `GET /users`: Fetch all users, with optional filters (`query`, `email`, `phoneNumber`)
  - `GET /users/{id}`: Fetch a single user by their UID
  - `POST /users`: Create a new user
  - `PUT /users/{id}`: Update an existing user's details
  - `DELETE /users/{id}`: Delete a user

### Frontend:

- **Typescript**: Strongly typed language for backend development
- **ReactJS** with Typescript
- Fetch and display data from the backend
- Implement pagination for user listing
- Basic UI for CRUD operations (list, add, update, delete users)
- **ESLint** for linting
- **Jest** for unit tests

## Project Setup

**Clone the repository:**

```bash
git clone https://github.com/sanjas5/user-management.git
```

### Backend Setup

1. **Navigate to server folder:**
   ```bash
   cd server
   ```
2. **Setup PostgreSQL Database:**

- You can use your local PostgreSQL Database and data will be seeded or use .env provided in email.

3. **Add the .env file in application:**
   Create a `.env` file in the root of the server folder and add next few lines with yours connection strings:
   ```bash
       DATABASE_HOST=_db_host_
       DATABASE_PORT=_db_port_
       DATABASE_USERNAME=_db_username_
       DATABASE_PASSWORD=_db_password_
       DATABASE_NAME=_db_name_
   ```
4. **Install dependencies**:
   ```bash
   yarn
   ```
5. **Run the Backend:**
   ```bash
   yarn start:dev
   ```

- The backend server will start on http://localhost:8000.

### Frontend Setup

1. **Go to client folder:**

   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   yarn
   ```
3. **Run the Frontend:** Start the frontend development server:

   ```bash
   yarn start
   ```

   The frontend will be accessible at http://localhost:3000.

   ### Testing

   Tests are written using Jest and React Testing Library. To run the tests:

   ```bash
   yarn test
   ```

   ### Linting

   ESLint is used for code quality and consistency. To run the linting process:

   ```bash
   yarn lint
   ```

## Additional Features

- **Responsive Design**: The app is responsive and works on various screen sizes.
- **Styling**: Custom CSS for styling without using CSS frameworks.

## Contact

- **Author**: Sanja Kadic
- **Email**: kadicsanja5@gmail.com
- **GitHub**: [sanjas5](https://github.com/sanjas5)

Thank you for checking out this project!
# user-management
