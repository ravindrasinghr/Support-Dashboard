const express = require('express');
const morgan = require('morgan');
const inventoryRoutes = require('./routes/inventory')

const app = express()

app.use(morgan('dev'))

app.use('/', inventoryRoutes)

module.exports = app