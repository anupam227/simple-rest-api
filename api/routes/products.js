const express = require('express');
const router = express.Router();
const Product = require('../models/product');


router.get('/', (req,res,next) => {
    Product.find()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req,res,next) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
       console.log(err)
       res.status(500).json({
           error:err
       })
    });
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: "No valid entries found"
            })
        } 
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:productId', (req,res,next) => {
    const id = req.params.productId;
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    
    }
    Product.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:productId', (req,res,next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        res.status(400).json({
            error: err,
            mesaage: "Cannot delete item"
        })
    })
})


module.exports = router;