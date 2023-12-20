# ShopyNode

## Table of Contents

-   [Introduction](#introduction)
-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Environment Variables](#environment-variables)
    -   [Run Frontend](#run-frontend)
    -   [Run Backend](#run-backend)
    -   [Sample User Logins](#sample-user-logins)
    -   [Database Seeder](#database-seeder)
-   [Data Modeling](#data-modeling)
-   [API Endpoints](#api-endpoints)
-   [Folder Structure](#folder-structure)
-   [Deployment](#deployment)

## Introduction

This project is just like a real-world e-commerce website. It is a full-featured
shopping cart with complete backend and frontend support using the MERN stack.
See it in action at [ShopyNode](https://shopynode-d3096ac3676f.herokuapp.com/).

## Technologies Used

-   **Frontend**: [Vite], [React.js]
-   **Backend**: [Node.js], [Express.js]
-   **Database**: [MongoDB]
-   **Other libraries**:
    -   **Frontend**: [React Query], [React Router], [Axios], [React Toastify],
        [MUI]
    -   **Backend**: [Mongoose], [Bcryptjs], [JSON Web Token]

## Features

-   Full-featured shopping cart
-   Product reviews and ratings
-   Product pagination
-   Product search feature
-   User profile with orders
-   Admin product management
-   Admin user management
-   Admin Order details page
-   Mark orders as delivered option
-   Checkout process (shipping, payment method, etc)
-   Database seeder (products, users, reviews, & orders)

## Getting Started

### Installation

```bash
git clone https://github.com/korngsamnang/shopynode
```

### Environment Variables

Rename the `.env.example` file to `.env` and add the following

```bash
MONGO_URI=your-mongodb-uri

JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=your-jwt-expires-in(example: 90d)
JWT_COOKIE_EXPIRES_IN=your-cookie-expires-in(example: 90)

VITE_BASE_URL=your-backend-bash-url
```

### Run Frontend

```bash
cd frontend

npm install

npm run dev
```

### Run Backend

```bash
npm install

npm run dev
```

### Sample User Logins

```bash
john@example.com (Admin)
test1234

bob@example.com (Customer)
test1234

eva@example.com (Customer)
test1234
```

### Database Seeder

```bash
cd backend
node dev-data/import-dev-data.js --delete  # Delete data
node dev-data/import-dev-data.js --import  # Import data
```

## Data Modeling

> Data Modeling for shopynode app.
> ![](https://github.com/korngsamnang/shopynode/assets/99709883/d5d18ce8-7988-4759-88c1-8a3e3b1cffda)

## API Endpoints

-   HTTP methods /api/v1/auth
-   HTTP methods /api/v1/users
-   HTTP methods /api/v1/orders
-   HTTP methods /api/v1/products
-   HTTP methods /api/v1/reviews

## Folder Structure

```
└── 📁backend
    └── 📁config
    └── 📁controllers
    └── 📁dev-data
    └── 📁models
    └── 📁routes
    └── 📁utils
    └── app.js
    └── server.js

└── 📁frontend
	└── index.html
    └── 📁public
        └── 📁images
    └── 📁src
        └── 📁admin
            └── 📁orders
            └── 📁products
            └── 📁users
        └── 📁contexts
        └── 📁features
            └── 📁authentication
            └── 📁orders
            └── 📁products
            └── 📁reviews
            └── 📁users
        └── 📁pages
        └── 📁services
        └── 📁ui
        └── 📁utils
        └── App.jsx
        └── index.css
        └── main.jsx
```

## Deployment

This project is deployed on [Heroku]. When you click to visit this project for
the first time, there might be a delay in loading the page. This is because the
Heroku container may have been temporarily shut down due to inactivity after 30
minutes. Please be patient as it restarts.

[React.js]: https://react.dev/
[React Query]: https://tanstack.com/query/latest/
[Axios]: https://axios-http.com/docs/intro/
[MUI]: https://mui.com//
[React Router]: https://reactrouter.com/en/main/
[React Toastify]: https://github.com/fkhadra/react-toastify//
[Express.js]: https://expressjs.com//
[MongoDB]: https://www.mongodb.com//
[Mongoose]: https://mongoosejs.com//
[JSON Web Token]: https://jwt.io//
[Bcryptjs]: https://www.npmjs.com/package/bcryptjs/
[Node.js]: https://nodejs.org/en/
[Vite]: https://vitejs.dev/
[Heroku]: https://heroku.com/
