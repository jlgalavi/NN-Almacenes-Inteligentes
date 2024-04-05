const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => 
{
    navMenu.classList.toggle('nav-menu_visible')
    if(navMenu.classList.contains('nav-menu_visible'))
    {
        navToggle.setAttribute('aria-label', 'Close menu');
    }
    else
    {
        navToggle.setAttribute('aria-label', 'Open menu');
    }
});

const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
menuLinks.forEach(menuLink => 
    {
    menuLink.addEventListener('click', () => {
        navMenu.classList.remove('nav-menu_visible');
        navToggle.setAttribute('aria-label', 'Close menu');
    });
});

const btnCart = document.querySelector('.container-icon-buy');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => 
{
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

const productsList = document.querySelector('.Pedidos-list');

let allProducts = [];

const valorTotal = document.querySelector('.total-price');

const countProducts = document.querySelector('#contador-productos');

const btnConfirm = document.querySelector('.btn-buy');

productsList.addEventListener('click', (e) =>
{
    if(e.target.classList.contains('btn-pedidos'))
    {
        const product = e.target.parentElement;
        const infoProduct = 
        {
            quantity: 1,
            title: product.querySelector('.Pedidos-item-title').textContent,
            price: product.querySelector('.price-product').textContent,
        };

        const productExist = allProducts.some(product => product.title === infoProduct.title);
        
        if(productExist)
        {
            const products = allProducts.map(product => 
            {
                if(product.title === infoProduct.title)
                {
                    product.quantity++;
                    return product;
                }
                else
                {
                    return product;
                }
            });
            allProducts = [...products];
        }
        else
        {
            allProducts = [...allProducts, infoProduct];
        }       
        showHTML();
    }
});

rowProduct.addEventListener('click', (e) =>
{
    if(e.target.classList.contains('icon-close'))
    {
        const product = e.target.parentElement;
        const title = product.querySelector('.title-product-cart').textContent;

        allProducts = allProducts.filter(product => product.title !== title);
        showHTML();
    }
});

const showHTML = () =>
{

    rowProduct.innerHTML = '';
    let total = 0;
    let totalOfProducts= 0;


    allProducts.forEach(product =>
    {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-productos">${product.quantity}</span>
                <p class="title-product-cart">${product.title}</p>
                <span class="price-product-cart">${product.price}</span>
                </div>
                <a href="#" class="icon-close">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </a>
        `;
        rowProduct.append(containerProduct);

        total = total + (parseInt(product.price.replace('€', '')) * product.quantity);
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `${total}€`; 
    countProducts.innerText = totalOfProducts;

};

btnConfirm.addEventListener('click', (e) => 
{
    const orderData = allProducts.map((product, index) => {
        let productId;
        switch (product.title) {
            case 'BOX S':
                productId = 1;
                break;
            case 'BOX M':
                productId = 2;
                break;
            case 'BOX L':
                productId = 3;
                break;
            case 'BOX XL':
                productId = 4;
                break;
            default:
                productId = 0;
                break;
        }
        return {
            id: productId,
            quantity: product.quantity
        };
    });

    fetch('https://github.com/jlgalavi/NN-Almacenes-Inteligentes.github.io/tree/main/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
        .then(response => response.json())
        .then(data => {
            const element = document.createElement('a');
            const file = new Blob([data.orderText], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = 'order.txt';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
