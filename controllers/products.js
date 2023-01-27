const Product = require('../models/Product')
const { cloudinary } = require('../cloudinary')

module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.status(200).send(products)
}

module.exports.getProductById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.status(200).send(product)
}

module.exports.createProduct = async (req, res) => {
  console.log(req.file.filename)
  const newProduct = new Product({
    image: {
      path: req.file.path,
      filename: req.file.fileName
    },
    title: req.body.title,
    description: req.body.description,
    prices: JSON.parse(req.body.prices),
    extras: JSON.parse(req.body.extras)
  })

  await newProduct.save()
  res.status(201).send({ message: 'Product created' })
}

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const oldProduct = await Product.findById(id)
  let image
  if (!req.file) {
    image = oldProduct.image
  } else {
    image = req.file.path
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      image,
      title: req.body.title,
      description: req.body.description,
      prices: JSON.parse(req.body.prices),
      extras: JSON.parse(req.body.extras)
    },
    { runValidators: true, new: true }
  )
  res.status(200).send(updatedProduct)
}

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndDelete(id)
  await cloudinary.uploader.destroy(product.image.filename)
  res.status(200).send({ message: 'Product deleted' })
}
