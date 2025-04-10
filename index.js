require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./app/config/db");
const cors = require("cors");
const schema = require("./app/graphql/schema");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Redis Client Setup
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});
redisClient.on("error", (err) => console.error("Redis error:", err));

// MongoDB Connection
connectDB();

// GraphQL API Setup
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL UI for testing
  })
);

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
