const Product = require("../models/productModel");
const asyncHandler = require('express-async-handlr')

//fetch all products
const fetchAllProducts = asyncHandler(
    async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
            // res.status(500).json({ message: error.message })

        }
    }
)

//fetch single product
const fetchSingleProduct = asyncHandler(
    async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
            // res.status(500).json({ message: error.message })
        }
    }
)

//create a new product
const createANewProduct = asyncHandler(
    async (req, res) => {

        try {
            const product = await Product.create(req.body)
            res.status(200).json(product);

        } catch (error) {
            res.status(500)
            throw new Error(error.message)
            // res.status(500).json({ message: error.message })
        }
    }
)

//update a product
const updateAProduct = asyncHandler(
    async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body);
            //if not product with that id found
            if (!product) {
                return res.status(404).json({ message: `Can not find any product with id: ${id}` })
            }
            const updatedProduct = await Product.findById(id)
            res.status(200).json({ updatedProduct })

        } catch (error) {
            res.status(500)
            throw new Error(error.message)
            // res.status(500).json({ message: error.message })
        }
    }
)

//delete a product
const deleteAProduct = asyncHandler(
    async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                res.status(500)
                throw new Error(`Can not find any product with id: ${id}`)
                // return res.status(404).json({ message: `Can not find any product with id: ${id}` })
            }
            res.status(200).json(product);

        } catch (error) {
            res.status(500)
            throw new Error(error.message)
            // res.status(500).json({ message: error.message })

        }
    }
)

module.exports = {
    fetchAllProducts,
    fetchSingleProduct,
    createANewProduct,
    updateAProduct,
    deleteAProduct
}