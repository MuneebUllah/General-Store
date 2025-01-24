const express = require('express');
const { login, signUp } = require('../controller/user');

const userRoutes = express.Router()

userRoutes.post('/login' , login)
userRoutes.post('/signup' , signUp)

module.exports = userRoutes;