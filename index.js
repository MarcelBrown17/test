// const { express, routes } = require("./controller");
// const app = express();
// const express = require('express')
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const port = +process.env.PORT || 3000;
// // static files
// app.use(express.static("./static"));
// app.use(
//   express.urlencoded({
//     extended: false,
//   }),
//   cookieParser(),
//   cors(),
//   routes
// );
// // set up cors access
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Request-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Expose-Headers", "Authorization");
//   next();
// });
// // direct to routes description page
// routes.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./static/index.html"));
// });
// // set server
// app.listen(port, () => {
//   console.log(`The server is running on port ${port}`);
// });

const { express, routes } = require("./controller");
const app = express();
const path = require("path");
const db = require("./config");
const bodyParser = require("body-parser");
const port = +process.env.PORT || 3000;

app.use(
  express.static("./static"),
  express.urlencoded({
    extended: true,
  }),
  routes
);

routes.get("^/$|/challenger", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../api/static/html/index.html"));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

// Server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

// Add products to api

app.post("/products", bodyParser.json(), (req, res) => {
  const query = `INSERT INTO Products SET ?;`;
  db.query(query, [req.body], (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "Product has been added",
    });
  });
});

// Delete products from api

app.delete("/product/:id", (req, res) => {
  const query = `
    DELETE FROM Products WHERE prodID = ${req.params.id};`;
  db.query(query, (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "Product was successfully deleted",
    });
  });
});

// add user

app.post("/users", bodyParser.json(), (req, res) => {
  const query = `INSERT INTO Users SET ?;`;
  db.query(query, [req.body], (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "User was added",
    });
  });
});
