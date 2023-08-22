const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();

const {users, products} = require('../models');

// users routes
routes.get('/users', (req, res) => {
    users.fetchUsers(req, res)
});

routes.get('/user/:id', (req, res) => {
    users.fetchUser(req, res)
});

routes.post('/register',
bodyParser.json(), (req, res) => {
    users.register(req, res)
});

routes.post('/login',
bodyParser.json(), (req, res) => {
    users.login(req, res)
});

routes.put('/user/:id', 
bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
});

routes.patch('/user/:id', 
bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
});

routes.delete('/user/:id', (req, res) => {
    users.deleteUser(req, res)
});

// product routes
routes.get('/products', (req, res) => {
    products.fetchProducts(req, res)
});

routes.get('/product/:id', (req, res) => {
    products.fetchProduct(req, res)
});

routes.post('/product', 
bodyParser.json(), (req, res) => {
    products.addProduct(req, res)
});

routes.put('/product/:id', 
bodyParser.json(), (req, res) => {
    products.updateProduct(req, res)
});

routes.patch('/product/:id', 
bodyParser.json(), (req, res) => {
    products.updateProduct(req, res)
});

routes.delete('/product/:id',
bodyParser.json(), (req, res) => {
    products.deleteProduct(req, res)
});

module.exports = {
    express,
    routes
}