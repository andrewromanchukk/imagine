let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Ball',
        tag: 'socerball',
        price:2000,
        inCart:0
    },
    {
        name:'Skateboard',
        tag: 'blackskateboard',
        price:2500,
        inCart:0
    },
    {
        name:'Snowboard',
        tag: 'whitesnowboard',
        price:3500,
        inCart:0
    },
    {
        name:'Bicykle',
        tag: 'blackbicykle',
        price:5000,
        inCart:0
    }
]

for ( let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); 
    
    if(cartItems!=null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }     
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
        [product.tag]:product
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

onLoadCartNumbers();