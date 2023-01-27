const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(express.json({ limit: '50mb' }))

app.use(cookieParser())

mongoose.set('strictQuery', false)

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/pizzaDelivery'

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch(err => console.log(err))

app.use('/orders', orderRoutes)
app.use('/products', productRoutes)
app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).send({ error: err.message })
})

app.listen(3001, () => {
  console.log('LISTENING ON PORT 3001')
})
