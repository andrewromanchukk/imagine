let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Ball',
        tag: 'product-ball',
        price:2000,
        inCart:0
    },
    {
        name:'Skateboard',
        tag: 'product-skateboard',
        price:2500,
        inCart:0
    },
    {
        name:'Snowboard',
        tag: 'product-snowboard',
        price:3500,
        inCart:0
    },
    {
        name:'Bicykle',
        tag: 'product-bicycle',
        price:5000,
        inCart:0
    }
]

for ( let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
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

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My CartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        product.price);

    }else{
        localStorage.setItem("totalCost", product.price);

    }

}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="wrapper-products>"
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./img/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            </div>
            `
        });
    }
}


onLoadCartNumbers();
displayCart();