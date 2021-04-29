const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);