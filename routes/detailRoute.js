const express = require('express');
const detailRouter = express.Router();
const { createDetail, getImage } = require('../controller/detailController');

detailRouter.route('/').post(createDetail);
detailRouter.route('/:id').get(getImage);

module.exports = detailRouter;