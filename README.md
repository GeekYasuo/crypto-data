# Real-Time Data API

This project is a Node.js application that fetches real-time price data for Bitcoin from CoinGecko and stores it in a MongoDB database. It provides an API to retrieve the stored data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community) and ensure it is running on your local machine.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/GeekYasuo/crypto-data
   cd crypto-data

Start MongoDB:

Ensure MongoDB is running. You can start it by running:

mongod --port 27017

Run the Application:
npm start

API Endpoints
Get Data
URL: /api/data
Method: GET
Query Parameters:
symbol (required): The symbol of the cryptocurrency (e.g., bitcoin).
Response:
Returns an array of objects with symbol, price, and timestamp.
Example Request:

curl "http://localhost:5000/api/data?symbol=bitcoin"

