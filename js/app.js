const categoryContainer = document.querySelector('#category-container');
const productsContainer = document.querySelector('.products__grid');
const seeMoreButton = document.getElementById('see-more-button');
let productOffset = 8; 
const productsLimit = 20; 

const fetchCategories = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        displayCategories(categories.slice(0, 4)); 
    } catch (error) {
        console.error('Kategoriyalarni olishda xato:', error);
    }
};


const displayCategories = (categories) => {
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('categories__card');
        categoryCard.innerHTML = `
            <h3>${category}</h3>
        `;
        categoryContainer.appendChild(categoryCard);
        
        categoryCard.addEventListener('click', () => {
            productsContainer.innerHTML = ''; 
            fetchCategoryProducts(category); 
        });
    });
};

const fetchCategoryProducts = async (category) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error(`Kategoriyadagi mahsulotlarni olishda xato: ${category}`, error);
    }
};

const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products.slice(productOffset, productOffset + 4)); 
    } catch (error) {
        console.error('Mahsulotlarni olishda xato:', error);
    }
};

const displayProducts = (products) => {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('products__card');

        productCard.innerHTML = `
            <img class="products__card-image" src="${product.image}" alt="${product.title}">
            <h3 class="products__card-title">${product.title}</h3>
            <p class="products__card-price">$${product.price}</p>
            <div class="products__card-icons">
                <a href="#"><i class="fa-regular fa-heart"></i></a>
                <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
            </div>
        `;

        productCard.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });

        productsContainer.appendChild(productCard);
    });
};


seeMoreButton.addEventListener('click', () => {
    productOffset += 4; 
    fetchProducts();
});

fetchCategories();
fetchProducts();

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.one').innerHTML = `<img src="${data[0].image}" alt="Image 1">`;
        document.querySelector('.two').innerHTML = `<img src="${data[1].image}" alt="Image 2">`;
        document.querySelector('.three').innerHTML = `<img src="${data[2].image}" alt="Image 3">`;
        document.querySelector('.four').innerHTML = `<img src="${data[3].image}" alt="Image 4">`;
    })
    .catch(error => console.error('Xato:', error));
