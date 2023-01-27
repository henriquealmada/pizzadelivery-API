const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: {
        path: String,
        filename: String
      },
      required: true
    },
    title: {
      type: String,
      required: true,
      maxLength: 60
    },
    description: {
      type: String,
      required: true,
      maxLength: 200
    },
    prices: {
      type: [Number],
      required: true
    },
    extras: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true }
        }
      ]
    }
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
