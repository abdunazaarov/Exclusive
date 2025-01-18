// Elementlar
const categoryContainer = document.querySelector('#category-container');
const productsContainer = document.querySelector('.products__grid');
const seeMoreButton = document.getElementById('see-more-button');
let productOffset = 8; // Boshlang'ich mahsulot ofseti
const productsLimit = 20; // Maksimal mahsulot limiti

// API dan ma'lumot olish uchun umumiy funksiya
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ma\'lumot olishda xato yuz berdi');
        return await response.json();
    } catch (error) {
        console.error('Fetch xatosi:', error);
        return null;
    }
};

// Kategoriyalarni yuklash va ko'rsatish
const fetchCategories = async () => {
    const categories = await fetchData('https://dummyjson.com/products/categories');
    if (categories && categories.length > 0) {
        displayCategories(categories.slice(0, 4)); // Kategoriyalarni ko'rsatish
    } else {
        categoryContainer.innerHTML = '<p>Kategoriyalarni yuklashda xatolik yuz berdi.</p>';
    }
};

// Kategoriyalarni sahifaga joylash
const displayCategories = (categories) => {
    categories.forEach((category) => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('categories__card');
        categoryCard.innerHTML = `<h3>${category}</h3>`;
        categoryContainer.appendChild(categoryCard);

        categoryCard.addEventListener('click', () => {
            productsContainer.innerHTML = ''; // Eski mahsulotlarni tozalash
            fetchCategoryProducts(category); // Tanlangan kategoriyadagi mahsulotlarni yuklash
        });
    });
};

// Tanlangan kategoriyadagi mahsulotlarni yuklash
const fetchCategoryProducts = async (category) => {
    const response = await fetchData(`https://dummyjson.com/products/category/${category}`);
    if (response && response.products) {
        displayProducts(response.products); // Mahsulotlarni ko'rsatish
    } else {
        productsContainer.innerHTML = '<p>Mahsulotlarni yuklashda xatolik yuz berdi.</p>';
    }
};

// Mahsulotlarni yuklash va ko'rsatish
const fetchProducts = async () => {
    const response = await fetchData('https://dummyjson.com/products');
    if (response && response.products) {
        displayProducts(response.products.slice(productOffset, productOffset + 4)); // Mahsulotlarni sahifaga joylash
    } else {
        productsContainer.innerHTML = '<p>Mahsulotlarni yuklashda xatolik yuz berdi.</p>';
    }
};

// Mahsulot kartasini yaratish
const createProductCard = (product) => {
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
        if (product.id) {
            window.location.href = `product-detail.html?id=${product.id}`;
        } else {
            console.error('Mahsulot ID mavjud emas:', product);
        }
    });
    

    return productCard;
};

// Mahsulotlarni sahifaga joylash
const displayProducts = (products) => {
    products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
};

// "See More" tugmasi funksiyasi
seeMoreButton.addEventListener('click', async () => {
    seeMoreButton.disabled = true; // Tugmani vaqtinchalik o'chirish
    productOffset += 4;
    await fetchProducts(); // Mahsulotlarni qayta yuklash
    seeMoreButton.disabled = false; // Tugmani qayta yoqish
});

// Asosiy sahifa uchun mahsulot rasmlarini yuklash
const fetchFeaturedProducts = async () => {
    const response = await fetchData('https://dummyjson.com/products');
    if (response && response.products && response.products.length >= 4) {
        document.querySelector('.one').innerHTML = `<img src="${response.products[0].image}" alt="Image 1">`;
        document.querySelector('.two').innerHTML = `<img src="${response.products[1].image}" alt="Image 2">`;
        document.querySelector('.three').innerHTML = `<img src="${response.products[2].image}" alt="Image 3">`;
        document.querySelector('.four').innerHTML = `<img src="${response.products[3].image}" alt="Image 4">`;
    } else {
        console.error('Yetarli mahsulot mavjud emas yoki yuklashda xatolik yuz berdi.');
    }
};

// Sahifa yuklanganda funksiyalarni chaqirish
fetchCategories();
fetchProducts();
fetchFeaturedProducts();
