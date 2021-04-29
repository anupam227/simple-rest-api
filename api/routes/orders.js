const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orderss'
    });
});

router.post('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling POST requests to /orders'
    });
});

router.get('/:productId', (req,res,next) => {
    
})

module.exports = router;