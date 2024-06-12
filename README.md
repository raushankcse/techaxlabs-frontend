# Todo App Frontend

This is the frontend of the Todo application built using React. It provides a user interface for users to register, log in, and manage their todos.

## Features

- User Authentication (Register/Login)
- Add, Edit, Delete, and Mark Todos as Completed
- Filter Todos by Completion Status
- Persistent Authentication using JWT
- Responsive UI using Bootstrap
- Pagination for Todos
- Toast notifications for user feedback

## Technologies Used

- React
- Bootstrap
- React Router
- React Toastify

## Project Structure
  ```
  ├── public
  │ └── index.html
  ├── src
  │ ├── components
  │ │ ├── AuthRoute.js
  │ │ ├── Home.js
  │ │ ├── Login.js
  │ │ ├── Register.js
  │ │ ├── PrivateRoute.js
  │ │ └── Todo.js
  │ ├── App.js
  │ ├── index.js
  │ └── App.css
  ├── .env
  ├── package.json
  └── README.md
  ```



## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend

2. **Install dependencies:**
   ```bash
   npm install

3. **Configure environment variables:**
  Create a .env file in the frontend directory and add the following variable:

   ```bash
   REACT_APP_API_URL=http://localhost:5000

4. **Start the React app:**
   ```bash
   npm start


Usage
 1.  Register a new user:
    Navigate to http://localhost:3000/register and create a new account.

 2. Login:
    Navigate to http://localhost:3000/login and log in with your credentials.

 3. Manage Todos:
    Once logged in, you will be redirected to the Todo page where you can add, edit, delete, and mark todos as completed.


Contact
Author: Raushan Kumar
Email: raushankcse@gmail.com