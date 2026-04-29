// Cartify - Shared Logic & State Management

const PRODUCTS = [
    { id: 1, name: "Mens Cotton Shirt", category: "Clothing", price: 20.00, stock: 83, rating: 4.3, reviews: 218, img: "👕" },
    { id: 2, name: "Classic Blue Jeans", category: "Clothing", price: 22.50, stock: 64, rating: 4.4, reviews: 301, img: "👖" },
    { id: 3, name: "Leather Jacket", category: "Clothing", price: 25.00, stock: 100, rating: 4.6, reviews: 58, img: "🧥" },
    { id: 4, name: "White Athletic Sneakers", category: "Clothing", price: 27.50, stock: 97, rating: 4.2, reviews: 213, img: "👟" },
    { id: 5, name: "Black T-Shirt", category: "Clothing", price: 20.00, stock: 120, rating: 4.4, reviews: 220, img: "👕" },
    { id: 6, name: "Gray Hoodie", category: "Clothing", price: 22.50, stock: 45, rating: 4.8, reviews: 462, img: "🧥" },
    { id: 7, name: "Denim Shorts", category: "Clothing", price: 15.00, stock: 88, rating: 4.1, reviews: 189, img: "🩳" },
    { id: 8, name: "Casual Blazer", category: "Clothing", price: 35.00, stock: 32, rating: 4.3, reviews: 268, img: "🧥" }
];

const CATEGORIES = [
    { name: "Beauty & Personal Care", icon: "💄", count: 30 },
    { name: "Books", icon: "📚", count: 30 },
    { name: "Clothing", icon: "👕", count: 30 },
    { name: "Electronics", icon: "📱", count: 30 },
    { name: "Home & Garden", icon: "🏡", count: 30 },
    { name: "Kitchen & Dining", icon: "🍳", count: 30 },
    { name: "Sports & Outdoors", icon: "🏀", count: 30 },
    { name: "Toys & Games", icon: "🎮", count: 30 }
];

// Initialize State
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
let orders = JSON.parse(sessionStorage.getItem('orders')) || [];

function saveState() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('orders', JSON.stringify(orders));
    updateCartBadge();
}

function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    });
}

// Cart Logic
function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveState();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveState();
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveState();
            renderCart();
        }
    }
}

function clearCart() {
    cart = [];
    saveState();
    renderCart();
}

// Checkout Logic
function processCheckout() {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = 10.00;
    const total = subtotal + tax + shipping;

    const newOrder = {
        id: 'order_' + Date.now().toString().slice(-8),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2),
        status: 'Processing',
        customerId: 'user_' + Math.floor(Math.random() * 1000000),
        customerName: 'Mathu Mathi',
        customerEmail: 'mathu9147@gmail.com'
    };

    orders.unshift(newOrder);
    cart = [];
    saveState();
    window.location.href = 'orders.html';
}

// UI Renderers
function renderCategories() {
    const grid = document.getElementById('category-grid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(cat => `
        <a href="products.html?category=${cat.name}" class="category-card">
            <span class="category-icon">${cat.icon}</span>
            <h3>${cat.name}</h3>
            <span>${cat.count} Items</span>
        </a>
    `).join('');
}

function renderShopCategories() {
    const container = document.getElementById('shop-categories');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const activeCat = urlParams.get('category') || 'All';

    const cats = [{ name: 'All', icon: '🛍️' }, ...CATEGORIES];

    container.innerHTML = cats.map(cat => `
        <a href="products.html?category=${cat.name}" class="shop-cat-item ${activeCat === cat.name ? 'active' : ''}">
            <span>${cat.icon}</span>
            ${cat.name}
        </a>
    `).join('');
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'All';
    
    document.getElementById('category-title').textContent = category === 'All' ? 'All Products' : `${category} Products`;

    const filtered = category === 'All' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === category);

    document.getElementById('product-count-text').textContent = `Showing ${filtered.length} products`;

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="text-center py-5 w-100">No products found in this category.</p>';
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <span style="font-size: 4rem">${p.img}</span>
                <span class="category-tag">${p.category}</span>
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="rating">
                    ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}
                    <span>${p.rating} (${p.reviews})</span>
                </div>
                <p class="product-desc">High-quality ${p.name.toLowerCase()} with great features and excellent comfort.</p>
                <div class="product-footer">
                    <div class="price-stock">
                        <span class="price">$${p.price.toFixed(2)}</span>
                        <span class="stock">${p.stock} in stock</span>
                    </div>
                    <div class="qty-control">
                        <button onclick="changeLocalQty(${p.id}, -1)">-</button>
                        <span id="qty-${p.id}">1</span>
                        <button onclick="changeLocalQty(${p.id}, 1)">+</button>
                    </div>
                    <button class="add-btn" onclick="handleAddToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function changeLocalQty(id, delta) {
    const el = document.getElementById(`qty-${id}`);
    let val = parseInt(el.textContent) + delta;
    if (val < 1) val = 1;
    el.textContent = val;
}

function handleAddToCart(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).textContent);
    addToCart(id, qty);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center py-5">Your cart is empty.</p>';
        document.getElementById('order-summary').style.display = 'none';
        return;
    }

    document.getElementById('order-summary').style.display = 'block';
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-img" style="font-size: 2rem">${item.img}</div>
            <div class="cart-item-info">
                <div class="cart-item-header">
                    <h3>${item.name}</h3>
                    <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <p class="text-muted mb-2">$${item.price.toFixed(2)} each</p>
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <div class="qty-control" style="width: 100px">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        🗑️ Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = 10.00;
    const total = subtotal + tax + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cart-count-title').textContent = `Items (${cart.length})`;
}

function renderOrders() {
    const container = document.getElementById('orders-list');
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = '<p class="text-center py-5">No orders found.</p>';
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <h3>Order ${order.id}</h3>
            <p class="text-muted">Placed on ${order.date}</p>
            <div class="order-status-badge status-${order.status.toLowerCase()}">
                ${order.status === 'Processing' ? '🕒' : order.status === 'Shipped' ? '🚚' : '✅'} ${order.status}
            </div>
            
            <div class="mt-3">
                <p><strong>Items (${order.items.length})</strong></p>
                ${order.items.map(i => `<p class="text-muted">${i.name} x ${i.quantity} <span style="float:right">$${(i.price * i.quantity).toFixed(2)}</span></p>`).join('')}
            </div>
            
            <div class="total-row" style="font-size: 1.1rem">
                <span>Total</span>
                <span style="float:right">$${order.total}</span>
            </div>
            
            <a href="order-details.html?id=${order.id}" class="view-details-btn">View Details →</a>
        </div>
    `).join('');
}

function renderOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        document.body.innerHTML = 'Order not found';
        return;
    }

    document.getElementById('detail-order-id').textContent = `Order ${order.id}`;
    document.getElementById('detail-order-date').textContent = order.date;
    document.getElementById('detail-status-badge').textContent = order.status;
    document.getElementById('detail-status-badge').className = `order-status-badge status-${order.status.toLowerCase()}`;

    // Update tracking steps
    const steps = ['Processing', 'Shipped', 'Delivered'];
    const currentStepIndex = steps.indexOf(order.status);
    
    document.querySelectorAll('.step').forEach((el, index) => {
        if (index < currentStepIndex) el.classList.add('completed');
        if (index === currentStepIndex) el.classList.add('active');
    });

    document.getElementById('detail-items').innerHTML = order.items.map(i => `
        <div class="mb-2">
            <p><strong>${i.name}</strong></p>
            <p class="text-muted">Quantity: ${i.quantity}</p>
            <p class="text-muted">Unit Price: $${i.price.toFixed(2)} <span style="float:right; color: var(--text-main); font-weight: 600">$${(i.price * i.quantity).toFixed(2)}</span></p>
        </div>
    `).join('');

    document.getElementById('detail-subtotal').textContent = `$${order.subtotal}`;
    document.getElementById('detail-tax').textContent = `$${order.tax}`;
    document.getElementById('detail-total').textContent = `$${order.total}`;
    
    document.getElementById('cust-name').textContent = order.customerName;
    document.getElementById('cust-email').textContent = order.customerEmail;
}

// Admin Logic
function renderAdminDashboard() {
    const table = document.getElementById('admin-orders-table');
    if (!table) return;

    const stats = {
        processing: orders.filter(o => o.status === 'Processing').length,
        shipped: orders.filter(o => o.status === 'Shipped').length,
        delivered: orders.filter(o => o.status === 'Delivered').length
    };

    document.getElementById('stat-processing').textContent = stats.processing;
    document.getElementById('stat-shipped').textContent = stats.shipped;
    document.getElementById('stat-delivered').textContent = stats.delivered;

    table.innerHTML = orders.map(o => `
        <tr>
            <td><a href="admin-order.html?id=${o.id}" class="text-primary">${o.id}</a></td>
            <td class="text-muted">${o.customerId}</td>
            <td class="text-main font-weight-600">$${o.total}</td>
            <td><span class="order-status-badge status-${o.status.toLowerCase()}" style="position: static">${o.status}</span></td>
            <td><a href="admin-order.html?id=${o.id}" class="manage-btn">Manage</a></td>
        </tr>
    `).join('');
}

function renderAdminOrder() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    document.getElementById('admin-order-id').textContent = `Order ${order.id}`;
    document.getElementById('admin-order-date').textContent = `Created on ${order.date}`;
    
    // Set active status card
    document.querySelectorAll('.status-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.status === order.status) card.classList.add('active');
    });

    document.getElementById('admin-items').innerHTML = order.items.map(i => `
        <div class="mb-2">
            <p><strong>${i.name}</strong></p>
            <p class="text-muted">Quantity: ${i.quantity} <span style="float:right; color: var(--text-main); font-weight: 600">$${(i.price * i.quantity).toFixed(2)}</span></p>
        </div>
    `).join('');

    document.getElementById('admin-total').textContent = `$${order.total}`;
}

function updateOrderStatus(newStatus) {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveState();
        renderAdminOrder();
        alert(`Order status updated to ${newStatus}`);
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) renderCategories();
    if (path.includes('products.html')) {
        renderShopCategories();
        renderProducts();
    }
    if (path.includes('cart.html')) renderCart();
    if (path.includes('orders.html')) renderOrders();
    if (path.includes('order-details.html')) renderOrderDetails();
    if (path.includes('admin.html')) renderAdminDashboard();
    if (path.includes('admin-order.html')) renderAdminOrder();
});
