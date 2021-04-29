const express = require('express');
const app = express();  
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoute = require('./api/routes/products'); 
const orderRoute = require('./api/routes/orders'); 


mongoose.connect('mongodb://localhost:27017/simple-rest-api', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB connects'))
.catch(err => console.log(err));


app.use(morgan('dev'));
app.use(express.json())

//routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server is running");
})
