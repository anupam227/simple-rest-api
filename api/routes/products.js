const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now()+ file.originalname);
    } 
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else {
        cb(null, false)
    }
}
const upload = multer({storage: storage,
    fileFilter: fileFilter
})

router.get('/', (req,res,next) => {
    Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', upload.single('productImage'),(req,res,next) => {
    console.log(req.file)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
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