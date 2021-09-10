let carts = document.querySelectorAll('.add-cart')

let stage = 'dev'

let products = []

async function getProducts() {
    const host = stage === 'dev' ? 'http://localhost:5000' : 'http://www.walkinglickco.com/'
    const response = await axios.get(`${host}/products`)
    console.log(response.data)
    products = response.data.products

    populateProducts()
}
getProducts()

function populateProducts() {
    const container = document.querySelector('.container')

    const productsHtml = products.map((product, i) => {
        return (
            `
            <div class="image">
            <img src="${product.image}" alt="${product.description}">
            <h3>${product.name}</h3>
            <span class="price">$${product.price}</span>
            <a href="#" class="add-cart cart${i + 1}">Add Cart</a>
            </div> 
            `
        )
    })

    if (container) {
        container.innerHTML += productsHtml.toString().replaceAll(',', '')
        addCartActions()
    } else {

    }
}

function addCartActions() {
    const hoverProducts = document.getElementsByClassName('image')
    let carts = document.querySelectorAll('.add-cart')

    for (let i = 0; i < hoverProducts.length; i++) {
        hoverProducts[i].addEventListener('mouseover', () => {
            carts[i].classList.add('showCart')
        })

        
            hoverProducts[i].addEventListener('mouseout', () => {
                carts[i].classList.remove('showCart')
            })
    }

    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i])
            totalCost(products[i])
        })
    }
}

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers')


    productNumbers = parseInt(productNumbers)

    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if (action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1)
        document.querySelector('.cart span').textContent = productNumbers - 1
    } else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1
    }

    // if(productNumbers) {
    //     localStorage.setItem('cartNumbers', productNumbers + 1)
    //     document.querySelector('.cart span').textContent = productNumbers + 1
    // }else{
    //     localStorage.setItem('cartNumbers', 1)
    //     document.querySelector('.cart span').textContent = 1
    // }

    setItems(product)

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)


    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }

    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}


function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost')

    if (action == 'decrease') {
        cartCost = parseInt(cartCost)

        localStorage.setItem('totalCost', cartCost - product.price)
    }

    else if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price)
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCost')
    if (cartItems && productContainer) {
        productContainer.ineerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <div class="product">
                <div class="info">
                <i class="fas fa-times-circle"></i>
                <img src="./images/${item.tag}.jpg" >
                <span>${item.name}</span>
                </div>
                <div class ="price">${item.price}</div>
                <div class ="quantity1">
                <i class="fas fa-minus-circle"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-plus-circle"></i>
                </div>
                <div class="total">$${item.inCart * item.price}.00</div>
                </div>
                </div>
                `
        })

        productContainer.innerHTML += `
            <div class="total-container">
            <h4 class="Total Price">Total Price:</h4>
            <h4 class="Sum Price">$${cartCost}.00</h4>
            </div>
            
        `

    }
    deleteButtons()
    manageQuanlity()
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product .fa-times-circle')
    let productName
    let productNumbers = localStorage.getItem('cartNumbers')
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let cartCost = localStorage.getItem('totalCost')

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim()
                .toLowerCase().replace(/ /g, '')


            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart)

            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price
                * cartItems[productName].inCart))

            delete cartItems[productName]
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))

            displayCart()
            onLoadCartNumbers()


            history.go(0)


        })
    }
}

function manageQuanlity() {
    let decreaseButtons = document.querySelectorAll('.fa-minus-circle')
    let increaseButtons = document.querySelectorAll('.fa-plus-circle')
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let currentQuanity = 0
    let currentProduct = ""


    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuanity = decreaseButtons[i]
                .parentElement.querySelector('span').textContent

            currentProduct = decreaseButtons[i]
                .parentElement.previousElementSibling
                .previousElementSibling
                .querySelector('span').textContent.trim().toLowerCase().replace(/ /g, '')


            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1
                cartNumbers(cartItems[currentProduct], "decrease")
                localStorage.setItem('productsInCart', JSON.stringify(cartItems))
                totalCost(cartItems[currentProduct], "decrease")

                history.go(0)
                displayCart()
            }
        })
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuanity = increaseButtons[i]
                .parentElement.querySelector('span').textContent
            currentProduct = increaseButtons[i]
                .parentElement.previousElementSibling.previousElementSibling
                .querySelector('span').textContent
                .trim().toLowerCase().replace(/ /g, '')


            cartItems[currentProduct].inCart += 1
            cartNumbers(cartItems[currentProduct])
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))
            totalCost(cartItems[currentProduct], "increase")

            history.go(0)
            displayCart()

        })
    }
}

onLoadCartNumbers()
displayCart()