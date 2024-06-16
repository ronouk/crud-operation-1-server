//routes
const express = require("express");
const Product = require("../models/productModel");
const { fetchAllProducts, fetchSingleProduct, createANewProduct, updateAProduct, deleteAProduct } = require("../controllers/productControllers")

const router = express.Router();

//fetch all products
router.get('/', fetchAllProducts)

//get a single product
router.get('/:id', fetchSingleProduct)

//post a product
router.post('/', createANewProduct)

//update data
router.put('/:id', updateAProduct)

//delete a product

router.delete("/:id", deleteAProduct)

module.exports = router;