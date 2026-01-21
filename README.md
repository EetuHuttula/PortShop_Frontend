# PortShop - MERN Stack E-commerce

A modern full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). Browse, filter, and purchase products with a seamless shopping experience.

🌐 **Live Demo:** https://portshop-red.vercel.app/

## Features

- **Product Catalog**: Browse and search products with category filtering
- **Shopping Cart**: Add/remove products, view cart summary
- **User Authentication**: Register and login with secure authentication
- **Checkout**: Complete purchase process with order tracking
- **Order History**: View past orders and order details
- **User Profile**: Manage user account and preferences
- **Admin Dashboard**: Administrative tools for managing products and categories
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Toast Notifications**: Real-time user feedback for actions

## Tech Stack - MERN

### Frontend (React)
- **Framework**: React 18.3.1
- **Routing**: React Router v6
- **UI Framework**: Bootstrap 5 + React Bootstrap
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Database**: MongoDB

### Full Stack Features
- Secure RESTful API architecture
- JWT-based authentication
- Real-time data synchronization
- Scalable database design

## Project Structure

```
src/
├── components/              # Reusable React components
│   ├── Navbar.jsx          # Navigation bar
│   ├── TopBanner.jsx       # Top banner component
│   ├── CartPopup.jsx       # Shopping cart popup
│   ├── AddToCartButton.js  # Add to cart button
│   ├── Hero/               # Hero banner section
│   └── serviceHelpers/     # Admin service components
├── contexts/               # React Context providers
│   └── CartContext.js      # Shopping cart state management
├── pages/                  # Page components
│   ├── auth/              # Authentication pages (Login, Register)
│   ├── cart/              # Cart and checkout pages
│   ├── Front/             # Product listing page
│   ├── orders/            # Order history page
│   ├── productPage/       # Individual product details
│   ├── profile/           # User profile page
│   └── AdminTools/        # Admin dashboard
├── services/              # API service modules
│   ├── productApi.js      # Product endpoints
│   ├── categoryApi.js     # Category endpoints
│   ├── orderApi.js        # Order endpoints
│   ├── loginApi.js        # Authentication endpoints
│   └── registerApi.js     # Registration endpoints
├── utils/                 # Utility functions
│   └── imageUtils.js      # Image handling utilities
├── App.js                 # Main App component
└── index.js               # React entry point
```