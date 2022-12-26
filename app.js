const express = require('express');
const app = express();
const cors = require('cors');
//routes
const detailRouter = require('./routes/detailRoute');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/detail', detailRouter);

module.exports = app;