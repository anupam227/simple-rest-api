const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const {getAllOrders, createOrder, getOrderById, deleteOrders} = require('../controllers/orders')

router.get('/',checkAuth, getAllOrders);

router.post('/',checkAuth, createOrder);

router.get('/:orderId', checkAuth, getOrderById);

router.delete('/:orderId',checkAuth, deleteOrders);

module.exports = router;