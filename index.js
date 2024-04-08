var swiper = new Swiper('.mySwiper-1', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

var swiper = new Swiper('.mySwiper-2', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {    
            slidesPerView: 1,
        },
        520: {  
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    }

});

const cartInfo = document.querySelector('.cart-menu');
const rowProducts = document.querySelector('#cart-list');
const productsList = document.querySelector('#products-list');

let allProducts = [];

const valorTotal = document.querySelector('.total-price');
const btnBuyCart = document.querySelector('.btn-buy-cart');

productsList.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement.parentElement;
        const productInfo = 
        {
            image: product.querySelector('img').src,
            title: product.querySelector('h3').textContent,
            price: product.querySelector('.price').textContent,
            id: product.querySelector('button').getAttribute('data-id'),
            quantity: 1,
        };
        const productExist = allProducts.some(product => product.id === productInfo.id);
        if(productExist) {
            const products = allProducts.map(product => 
                product.id === productInfo.id ? {...product, quantity: product.quantity + 1} : product
            );
            allProducts = [...products];
        }
        else
        {
            allProducts = [...allProducts, productInfo];
        }
    showHTML();
    }
});

rowProducts.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove')) {
        const product = e.target.parentElement.parentElement;
        const productId = product.querySelector('a').getAttribute('data-id');
        allProducts = allProducts.filter(product => product.id !== productId);
        product.remove();
    }
    showHTML();
});

const showHTML = () => 
{
    rowProducts.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;


    allProducts.forEach(product => {
        const {image, title, price, quantity, id} = product;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${image}" width=100>
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>
                <a href="#" class="remove" data-id="${id}">X</a>
            </td>
        `;
        rowProducts.append(row);
        total += quantity * parseFloat(price.replace('€', ''));
        totalQuantity += quantity;
        
    });
    valorTotal.innerText = `${total}€`;
}

/*
const cart = document.getElementById('.cart');
const productsElemets = document.getElementById('products-list');
const products = document.querySelector('#cart-list tbody');
const clearCartBtn = document.getElementById('empty-cart');

loadEventListeners();

function loadEventListeners() {
    productsElemets.addEventListener('click', buyProduct);
    cart.addEventListener('click', removeProduct);
    clearCartBtn.addEventListener('click', clearCart);
}

function buyProduct(e) {
    e.preventDefault();
    if(e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

function getProductInfo(product) {
    const productInfo = {
        image: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        price: product.querySelector('.price').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        quantity: 1,
    };
    const productExist = productsElemets.some(product => product.id === productInfo.id);
    if(productExist) {
        const products = document.map(product => 
            product.id === productInfo.id ? {...product, quantity: product.quantity + 1} : product
        );
        productsElemets = [...products];
        }
        else
        {
            productsElemets = [...productsElemets, productInfo];
        }
       addIntoCart(productInfo);
}

function addIntoCart(product) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${product.image}" width=100>
        </td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td></td>
        <td>
            <a href="#" class="remove" data-id="${product.id}">X</a>
        </td>
    `;
    products.appendChild(row);
}

function removeProduct(e) {
    e.preventDefault();
    let product, productId;
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        product = e.target.parentElement.parentElement;
        productId = product.querySelector('a').getAttribute('data-id');
    }
}

function clearCart() {
    while(products.firstChild) {
        products.removeChild(products.firstChild);
    }
    return false;
}*/