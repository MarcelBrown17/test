const users = require("./users");
const products = require("./products");

// Export all objects
module.exports = {
  users: new users(),
  products: new products(),
};
