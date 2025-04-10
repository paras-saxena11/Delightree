const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLID } = require("graphql");
const resolvers = require("./resolver");

const CustomerSpendingType = new GraphQLObjectType({
  name: "CustomerSpending",
  fields: () => ({
    customerId: { type: GraphQLID },
    totalSpent: { type: GraphQLFloat },
    averageOrderValue: { type: GraphQLFloat },
    lastOrderDate: { type: GraphQLString },
  }),
});

const TopProductType = new GraphQLObjectType({
  name: "TopProduct",
  fields: () => ({
    productId: { type: GraphQLID },
    name: { type: GraphQLString },
    totalSold: { type: GraphQLInt },
  }),
});

const SalesAnalyticsType = new GraphQLObjectType({
  name: "SalesAnalytics",
  fields: () => ({
    totalRevenue: { type: GraphQLFloat },
    completedOrders: { type: GraphQLInt },
    categoryBreakdown: { type: new GraphQLList(new GraphQLObjectType({
      name: "CategoryBreakdown",
      fields: () => ({
        category: { type: GraphQLString },
        revenue: { type: GraphQLFloat },
      }),
    })) },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getCustomerSpending: {
      type: CustomerSpendingType,
      args: { customerId: { type: GraphQLID } },
      resolve: resolvers.getCustomerSpending,
    },
    getTopSellingProducts: {
      type: new GraphQLList(TopProductType),
      args: { limit: { type: GraphQLInt } },
      resolve: resolvers.getTopSellingProducts,
    },
    getSalesAnalytics: {
      type: SalesAnalyticsType,
      args: { startDate: { type: GraphQLString }, endDate: { type: GraphQLString } },
      resolve: resolvers.getSalesAnalytics,
    },
  },
});

module.exports = new GraphQLSchema({ query: Query });
