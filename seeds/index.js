const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')
const pizzas = require('./pizzas')
const orders = require('./orders')

mongoose
  .connect('mongodb://localhost:27017/pizzaDelivery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch(err => console.log(err))

const seedDatabase = async () => {
  await Order.deleteMany({})
  await Product.deleteMany({})
  await Order.insertMany(orders)

  await Product.insertMany(pizzas)
}

seedDatabase().then(() => {
  mongoose.connection.close()
})
