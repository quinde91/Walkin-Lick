const express = require('express');
const path = require('path');
const app = express();
const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

// app.get("/", (req, res) =>{
//     res.render('home')
// })

// app.get("/cart", (req, res) =>{
//     res.render('cart');
// })

app.use('/', require('./routes/pages'));
app.use('/products', require('./routes/products'))

app.listen(5000, () =>{
    console.log("Server is running");
})