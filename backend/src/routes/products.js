const express = require('express');
const router = express.Router();
const {Product} = require('../models/mongoose/products');

router.get(`/`,async (req, res) =>{
    const productList = await Product.find()
    !productList? res.status(500).send({message:'No hay productos guardados.'}):res.status(201).send(productList)
})

router.get('/:id', async (req,res) => {
    const product = await Product.findById(req.params.id);
    !product? res.status(500).send({message:'No existe un producto con este id'}):res.status(201).send(product);
})

router.put('/:id',async(req, res) => {
    let newProduct = req.body
    if(!mongoose.isValidObjectId(req.params.id)) {res.status(404).send('Invalid product ID')}
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            numberOfCards: newProduct.numberOfCards
        },
        {new:true}
    )

    !product?
        res.status(404).send({message:'El producto no se pudo actualizar'}): res.status(201).send(product);
})

router.post(`/`,async (req, res) =>{
    let newProduct = req.body
    let product = new Product({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        thumbnail: newProduct.thumbnail,
        numberOfCards: newProduct.numberOfCards,
    })

    product = await product.save()
    !product? res.status(500).send('Product not created'):res.status(200).send(product)
})

router.delete('/:id',(req,res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        product? res.status(200).json({
            success: true,
            message: 'Producto borrado'
        }) :
        res.status(404).json({
            succes:false,
            message:'No existe un producto con este ID'
        })
    })
    .catch(err => {
        return res.status(400).json({
            success:false,
            error:err
        })
    })
})

module.exports = router