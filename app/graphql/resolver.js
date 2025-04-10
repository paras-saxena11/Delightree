const Order = require("../models/Order");
const redis = require("../config/redis");
const { UUID } = require("mongodb");

const getCustomerSpending = async (_, { customerId }) => {
  const customerUUID = new UUID(customerId);
  const result = await Order.aggregate([
    { $match: { customerId: customerUUID, status: "completed" } },
    {
      $group: {
        _id: "$customerId",
        totalSpent: { $sum: "$totalAmount" },
        averageOrderValue: { $avg: "$totalAmount" },
        lastOrderDate: { $max: "$orderDate" },
      },
    },
  ]);

  console.log("Aggregation Result:", result);

  return result.length > 0
    ? {
        customerId,
        totalSpent: result[0].totalSpent,
        averageOrderValue: result[0].averageOrderValue,
        lastOrderDate: result[0].lastOrderDate,
      }
    : null;
};

const getTopSellingProducts = async (_, { limit }) => {
  return await Order.aggregate([
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        totalSold: { $sum: "$products.quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id", // productId in orders (UUID)
        foreignField: "_id", // _id in products (UUID)
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $project: {
        productId: "$productDetails._id",
        name: "$productDetails.name",
        totalSold: 1,
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: limit },
  ]);
};

const getSalesAnalytics = async (_, { startDate, endDate }) => {
  const cacheKey = `sales_analytics_${startDate}_${endDate}`;

  // Check if data is in Redis cache
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log("Serving from cache");
    return JSON.parse(cachedData);
  }

  // If not cached, fetch from MongoDB
  console.log("Fetching from MongoDB...");
  const analytics = await Order.aggregate([
    {
      $match: {
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        status: "completed",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        completedOrders: { $sum: 1 },
      },
    },
  ]);

  // Cache the result in Redis for 1 hour (3600 seconds)
  await redis.setex(cacheKey, 3600, JSON.stringify(analytics[0]));

  return analytics[0];
};

module.exports = {
  getCustomerSpending,
  getTopSellingProducts,
  getSalesAnalytics,
};
