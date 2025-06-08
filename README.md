# Cart-Stack

**Cart-Stack** is a fast and reliable online delivery platform that brings food items, groceries, daily use essentials, electronics, beverages, and more to your doorstep in just minutes. The project is built using **Node.js**, **Express.js**, **MongoDB**, with payment gateway integration via **Razorpay**, and map-based delivery location support using **Leaflet.js**. It also includes **Google Authentication** for secure and easy user/admin login. Admins have access to a powerful dashboard where they can manage the entire inventory by adding, updating, or deleting products and monitoring orders.

## Features

* 🚚 Lightning-fast delivery of a wide range of products
* 📦 Real-time product inventory management
* 💳 Secure online payments using Razorpay API
* 🗺️ Map integration using Leaflet.js for setting precise delivery location
* 🔐 Google OAuth 2.0 login for both users and admins
* 🧾 Order tracking and admin dashboard
* 🛠️ Admin dashboard for adding, updating, and deleting products
* 📱 Responsive design for mobile and desktop users

## Tech Stack

* **Node.js** – JavaScript runtime for the backend
* **Express.js** – Fast web framework for building RESTful APIs
* **MongoDB** – NoSQL database to store users, products, orders, etc.
* **Razorpay API** – For secure and seamless online payment integration
* **Leaflet.js** – Lightweight open-source JavaScript library for interactive maps
* **Google OAuth** – For social login via Google accounts

## Getting Started

### Prerequisites

* Node.js and npm installed
* MongoDB setup locally or on cloud (e.g., MongoDB Atlas)
* Razorpay developer credentials
* Google Developer Console project with OAuth client ID

### Installation

```bash
git clone https://github.com/yourusername/cart-stack.git
cd cart-stack
npm install
```

### Set Environment Variables

Create a `.env` file in the root directory with the following:

```
PORT=3000
MONGO_URI=your_mongo_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

### Run the Server

```bash
node server.js
```

Visit `http://localhost:3000` in your browser.

## Folder Structure

```
cart-stack/
├── public/             # Static assets (images, CSS, JS)
├── routes/             # Express route handlers
├── controllers/        # Business logic
├── models/             # Mongoose models
├── views/              # EJS templates for frontend
├── config/             # Razorpay and Google OAuth config
├── .env                # Environment variables
├── server.js           # App entry point
└── package.json        # Dependencies and scripts
```

## Screenshots

* User login page

![user_login](https://github.com/user-attachments/assets/0262c6e9-e78f-49c4-8eea-1d33936c8b6e)

* Home-Page

![home_page](https://github.com/user-attachments/assets/2f43ce10-8416-445f-9e36-042b8045e3f8)

* Cart page

![cart_1](https://github.com/user-attachments/assets/47607e3c-5418-4df1-bf50-3c908dd372fa)

![cart_2](https://github.com/user-attachments/assets/2bfa1733-f4ed-4461-b498-22700208bee3)

* Razorpay payment gateway

![razorpay_payment_gateway](https://github.com/user-attachments/assets/826f5e54-7ac9-4fb5-b412-c3fb625ae1ed)

* Map page for providing address

![map](https://github.com/user-attachments/assets/de305283-74ee-4f9d-a427-1335975eda64)

* Admin-login page

![admin_login](https://github.com/user-attachments/assets/2f80109a-7131-489f-b891-bb0cf4becaec)

* Admin-dashboard to add products

![admin_dashboard](https://github.com/user-attachments/assets/17dfcca5-c710-4dd3-8b93-356ac48cd146)


## Roadmap / Future Enhancements

* 🔎 Search and filter products
* 📍 Auto-locate user address using GPS
* 📦 Inventory notifications for low stock
* 📊 Admin analytics dashboard
* 🛒 Save favorite items or wish list

## Contributing

Contributions are welcome! Feel free to fork the repository, open issues, or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Razorpay](https://razorpay.com/docs/)
* [Leaflet.js](https://leafletjs.com/)
* [Google Developers Console](https://console.developers.google.com/)
