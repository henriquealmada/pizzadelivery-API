const express = require('express')
const { catchAsync } = require('../utils/catchAsync')
const {
  getAllOrders,
  createOrder,
  getOrderById,
  changeOrderStatus
} = require('../controllers/orders')

const router = express.Router()

router.get('/', catchAsync(getAllOrders))

router.post('/', catchAsync(createOrder))

router.get('/:id', catchAsync(getOrderById))

router.patch('/:id', catchAsync(changeOrderStatus))

module.exports = router
