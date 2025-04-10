# GraphQL API

## 📌 Project Overview

This project provides a **GraphQL API** for managing orders and retrieving sales analytics. It includes queries for:

- **Customer Spending**: Retrieve total and average spending for a customer.
- **Top Selling Products**: Get the best-selling products based on order quantity.
- **Sales Analytics**: Fetch revenue and completed order stats within a date range.

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (Running locally or cloud instance)

### Steps to Run

```sh
# Clone the repository
git clone <repository_url>
cd <project_folder>

# Install dependencies
npm install

# Start the server
npm start
```

### Environment Variables

Create a `.env` file and configure the following:

```env
MONGODB_URI=mongodb://localhost:27017/admin
PORT=4000
```

## 📡 GraphQL Endpoints

### **1️⃣ Get Customer Spending**

Fetch total spending, average order value, and last order date of a customer.

#### **cURL Request**

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"query { getCustomerSpending(customerId: \"adf96a4e-6987-4731-8798-09b109ff65c3\") { customerId totalSpent averageOrderValue lastOrderDate } }","variables":{}}'
```

#### **GraphQL Query**

```graphql
query {
  getCustomerSpending(customerId: "adf96a4e-6987-4731-8798-09b109ff65c3") {
    customerId
    totalSpent
    averageOrderValue
    lastOrderDate
  }
}
```

### **2️⃣ Get Top Selling Products**

Retrieve the top-selling products based on order quantity.

#### **cURL Request**

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"query { getTopSellingProducts(limit: 2) { productId name totalSold } }","variables":{}}'
```

#### **GraphQL Query**

```graphql
query {
  getTopSellingProducts(limit: 2) {
    productId
    name
    totalSold
  }
}
```

### **3️⃣ Get Sales Analytics**

Fetch total revenue and completed order count within a specific date range.

#### **cURL Request**

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{"query":"query GetSalesAnalytics($startDate: String!, $endDate: String!) { getSalesAnalytics(startDate: $startDate, endDate: $endDate) { totalRevenue completedOrders } }","variables":{"startDate":"2024-12-01T00:00:00.000Z","endDate":"2024-12-31T23:59:59.999Z"}}'
```

#### **GraphQL Query**

```graphql
query GetSalesAnalytics($startDate: String!, $endDate: String!) {
  getSalesAnalytics(startDate: $startDate, endDate: $endDate) {
    totalRevenue
    completedOrders
  }
}
```

## 🛠 Technologies Used

- **Node.js** & **Express.js** (Backend Framework)
- **MongoDB** (Database)
- **GraphQL** (API Query Language)
- **Mongoose** (MongoDB ODM)

## 📝 License

This project is licensed under the MIT License.

