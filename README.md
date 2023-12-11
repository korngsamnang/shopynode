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
-   [Data Modeling](#data-modeling)
-   [API Endpoints](#api-endpoints)
-   [Folder Structure](#folder-structure)
-   [Deployment](#deployment)

## Introduction

This project is just like a real-world e-commerce website. It is a full-featured
shopping cart with complete backend and frontend support using the MERN stack.
See it in action at [ShopyNode](https://shopynode-d3096ac3676f.herokuapp.com/).

## Technologies Used

-   **Frontend**: Vite, Reactjs
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB
-   **Other libraries**:
    -   **Frontend**: React Query, React Router, Axios, React Toastify, MUI
    -   **Backend**: Mongoose, Bcryptjs, JSON Web Token

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

Rename the .env.example file to .env and add the following

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
npm run dev
```

### Run Backend

```bash
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
