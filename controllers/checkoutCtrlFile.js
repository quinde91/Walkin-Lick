const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const {productList} = require('../products')
exports.checkoutCtrlFunction = async (req,res) => {

try {
    const productsFromFrontend = req.body.products
    console.log(productList)

 function productsToBuy(){
        let products = []

        productList.forEach(singleProducrList => {
            productsFromFrontend.forEach(singleProductFrontend => {
                if(singleProducrList.tag === singleProductFrontend.tag) {
                    products.push({
                        name: singleProducrList.name,
                        description: singleProducrList.description,
                        images: [singleProducrList.image],
                        amount: singleProducrList.price * 100,
                        currency: 'usd',
                        quantity: singleProductFrontend.inCart
                    })
                }
            })
        })
        return products
    }

     const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        shipping_address_collection: {
            allowed_countries: ['US', 'GB']
        },
        line_items: productsToBuy()
     });

    res.status(200).json({
        status:'success',
        session: session
    })
} catch (error) {
    console.log(error)
}



}

exports.cartSuccessFunction = (req, res) =>{
    res.render('thankYouPage')
}
