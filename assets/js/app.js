// Constants
const API_URL = 'https://dummyjson.com/products?limit=10';
const productList = document.getElementById('product-list');
const loader = document.getElementById('loader');

//fetch 
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products. Please try again later.'); 
    } finally {
        loader.style.display = 'none'; 
    }
}

// Display Products in UI 
function displayProducts(products) {
    productList.innerHTML = products.map(product => `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">Category: ${product.category}</p>
                    <p class="fw-bold">$${product.price}</p>
                    <button class="btn btn-warning btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initial Load
window.addEventListener('DOMContentLoaded', fetchProducts);