import express from 'express'
const express = require("express")
const bodyParser = require("body-parser");
const routes = express.Router();
const { users, products } = require("../model");

// users routes
//GET
routes.get("/users", (req, res) => {
  users.fetchUsers(req, res);
});
routes.get("/user/:id", (req, res) => {
  users.fetchUser(req, res);
});
//POST
routes.post("/register", bodyParser.json(), (req, res) => {
  users.register(req, res);
});
routes.post("/login", bodyParser.json(), (req, res) => {
  users.login(req, res);
});
//PUT
routes.put("/user/:id", bodyParser.json(), (req, res) => {
  users.updateUser(req, res);
});
//PATCH
routes.patch("/user/:id", bodyParser.json(), (req, res) => {
  users.updateUser(req, res);
});
//DELETE
routes.delete("/user/:id", (req, res) => {
  users.deleteUser(req, res);
});

// product routes
//get products
routes.get("/products", (req, res) => {
  products.fetchProducts(req, res);
});
routes.get("/product/:id", (req, res) => {
  products.fetchProduct(req, res);
});
//post products
routes.post("/product", bodyParser.json(), (req, res) => {
  products.addProduct(req, res);
});
//put products
routes.put("/product/:id", bodyParser.json(), (req, res) => {
  products.updateProduct(req, res);
});
//patch product
routes.patch("/product/:id", bodyParser.json(), (req, res) => {
  products.updateProduct(req, res);
});
//delete products
routes.delete("/product/:id", (req, res) => {
  products.deleteProduct(req, res);
});

module.exports = {
  express,
  routes,
};
