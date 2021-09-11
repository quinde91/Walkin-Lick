stage = 'dev'
const host = stage === 'dev' ? 'http://localhost:5000' : 'http://www.walkinglickco.com'

const stripe = Stripe('pk_test_51IocfJAJUHc8DpwBbaD61aWe77gjcNK6oKQ29dNEF0v0R8mJOESMnwgS5k5l8L8Z5N7lqsjBXLfKX2DayiXONCqf0036i0oVGE')
const startCheckout = document.getElementById('startCheckout')

startCheckout.addEventListener('click', () => {
    console.log('buy button click')
    startCheckout.textContent = 'processing...'
    buyProducts(myProducts())
})

function myProducts(){
    const getProducts = JSON.parse(localStorage.getItem('productsInCart'))
    console.log(getProducts)
    const products = []
    for(const property in getProducts) {
        products.push({
            tag: getProducts[property].tag,
            inCart: getProducts[property].inCart
        })
    }

   return products
}

async function buyProducts(cartProducts){
try {

    const body = JSON.stringify({
        products: cartProducts
    })
    
    const response = await axios.post(`${host}/checkout`, body, {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    console.log(response.data)

    await stripe.redirectToCheckout({
        sessionId: response.data.session.id
    })
} catch (error) {
    console.log(error)
}
}