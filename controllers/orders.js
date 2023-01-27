const Order = require('../models/Order')

module.exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
  res.status(200).send(orders)
}

module.exports.createOrder = async (req, res) => {
  const order = new Order({
    customer: req.body.name,
    address: req.body.address,
    total: req.body.total
  })
  const savedOrder = await order.save()
  res.status(201).send(savedOrder)
}

module.exports.getOrderById = async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)
  res.status(200).send(order)
}

module.exports.changeOrderStatus = async (req, res) => {
  const { id } = req.params
  const oldOrder = await Order.findById(id)
  if (oldOrder.status === 3) {
    return
  }
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: oldOrder.status + 1
    },
    { new: true }
  )
  res.status(200).send(updatedOrder)
}
