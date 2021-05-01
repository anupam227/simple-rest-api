const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const {getAllProducts, createProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/products');


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

router.get('/', getAllProducts);

router.post('/', upload.single('productImage'), checkAuth, createProduct);

router.get('/:productId', getProductById);

router.patch('/:productId',checkAuth, updateProduct)

router.delete('/:productId',checkAuth, deleteProduct)


module.exports = router;