const express = require('express');
const axios = require('axios')
const path = require('path');
const app = express();
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}))
app.use(express.json())




app.set('view engine', 'hbs');

app.get("/", (req, res) =>{
     res.render('home')
 })

 app.get("/cart", (req, res) =>{
       res.render('cart');
 })

app.use('/', require('./routes/pages'));
app.use('/store', require('./routes/pages'));
app.use('/products', require('./routes/products'))
app.use('/checkout', require('./routes/checkout'))

app.listen(process.env.PORT ||5000, () =>{
    console.log("Server is running");
})