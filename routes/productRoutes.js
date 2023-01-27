const express = require('express')
const { catchAsync } = require('../utils/catchAsync')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

const router = express.Router()

router.get('/', catchAsync(getAllProducts))

router.get('/:id', catchAsync(getProductById))

router.post('/', upload.single('image'), catchAsync(createProduct))

router.patch('/:id', upload.single('image'), catchAsync(updateProduct))

router.delete('/:id', catchAsync(deleteProduct))

module.exports = router
