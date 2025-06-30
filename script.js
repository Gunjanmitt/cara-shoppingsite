// script.js

// Toggle mobile menu button (if you add a mobile menu)
const menuBtn = document.querySelector('header nav button');
menuBtn?.addEventListener('click', () => {
  alert('Menu button clicked! You can add mobile menu toggle here.');
});

// Add to Cart button on product detail page
const addToCartBtn = document.querySelector('#product-info button');
addToCartBtn?.addEventListener('click', () => {
  const quantityInput = document.querySelector('#quantity');
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  alert(`Added ${quantity} item(s) to the cart.`);
  console.log(`Add to cart: quantity = ${quantity}`);
});

// Cart page functionality
const removeButtons = document.querySelectorAll('.remove-btn');
const cartTableBody = document.querySelector('#cart table tbody');
const totalDisplay = document.getElementById('total');

function updateTotal() {
  let total = 0;
  const rows = cartTableBody?.querySelectorAll('tr') || [];
  rows.forEach(row => {
    const priceText = row.querySelector('td:nth-child(3)').textContent.replace('$', '');
    const qtyText = row.querySelector('td:nth-child(4)').textContent;
    const price = parseFloat(priceText);
    const qty = parseInt(qtyText);
    total += price * qty;
    // Update subtotal cell
    const subtotalCell = row.querySelector('td:nth-child(5)');
    if (subtotalCell) subtotalCell.textContent = `$${(price * qty).toFixed(2)}`;
  });
  if (totalDisplay) totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

// Remove item from cart
removeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (row) {
      row.remove();
      updateTotal();
    }
  });
});

// Optional: Update subtotal & total if you want quantity input to be editable in cart
const qtyCells = document.querySelectorAll('#cart tbody tr td:nth-child(4)');
qtyCells.forEach(cell => {
  cell.contentEditable = true;
  cell.addEventListener('input', () => {
    updateTotal();
  });
});

// Initial total calculation on page load
updateTotal();

// script.js

// Add product to cart (stored in localStorage)
function addToCart(id, name, price) {
  // Get current cart or empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if item already in cart
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex >= 0) {
    // Increase quantity if item exists
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item
    cart.push({ id, name, price, quantity: 1 });
  }

  // Save cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${name} added to cart!`);
}

// Get cart items from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Remove item from cart by id
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Change quantity of an item
function updateQuantity(id, quantity) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === id);
  if (index >= 0) {
    if (quantity <= 0) {
      // Remove if quantity zero or less
      removeFromCart(id);
      return;
    }
    cart[index].quantity = quantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Calculate total price of cart
function calculateTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Render cart items in cart.html (or any cart section)
function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items');
  const totalPriceElem = document.getElementById('total-price');

  if (!cartContainer || !totalPriceElem) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElem.textContent = '$0.00';
    return;
  }

  // Build HTML for cart items
  let html = '<table><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th>Action</th></tr></thead><tbody>';
  cart.forEach(item => {
    const subtotal = (item.price * item.quantity).toFixed(2);
    html += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', parseInt(this.value))" style="width:50px;">
        </td>
        <td>$${subtotal}</td>
        <td><button onclick="removeFromCart('${item.id}')">Remove</button></td>
      </tr>
    `;
  });
  html += '</tbody></table>';

  cartContainer.innerHTML = html;
  totalPriceElem.textContent = `$${calculateTotal().toFixed(2)}`;
}

// Call renderCart on page load if cart section exists
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('caraCart')) || {};
  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = { name, price, quantity: 1 };
  }
  localStorage.setItem('caraCart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('caraCart')) || {};
  let count = 0;
  for (const id in cart) {
    count += cart[id].quantity;
  }

  const cartCount = document.getElementById('cart-count');
  if (count > 0) {
    cartCount.style.display = 'inline-block';
    cartCount.textContent = count;
  } else {
    cartCount.style.display = 'none';
  }
}

// Call this function on page load and whenever cart updates:
updateCartCount();

<!-- Blog Navigator -->
<div id="blog-navigator">
  <button class="nav-btn active" data-post="1">Blog 1</button>
  <button class="nav-btn" data-post="2">Blog 2</button>
  <button class="nav-btn" data-post="3">Blog 3</button>
</div>

<!-- Blog Images -->
<div id="blog">
  <img src="img/blog/blog1.jpg" alt="Blog 1" class="blog-thumb" data-post="1" />
  <img src="img/blog/blog2.jpg" alt="Blog 2" class="blog-thumb" data-post="2" />
  <img src="img/blog/blog3.jpg" alt="Blog 3" class="blog-thumb" data-post="3" />
</div>

<!-- Blog Post Display -->
<div id="blog-post-container" class="blog-post">
  <h3 id="blog-post-title">Blog 1 Title</h3>
  <img id="blog-post-image" src="img/blog/blog1.jpg" alt="Blog 1 Image" />
  <p id="blog-post-content">
    This is the content for Blog 1. Here you write the detailed post.
  </p>
</div>

<script>
  // Data for blog posts (you can move this to external JSON or server later)
  const blogPosts = {
    1: {
      title: "Blog 1 Title",
      image: "img/blog/blog1.jpg",
      content: "This is the content for Blog 1. Here you write the detailed post."
    },
    2: {
      title: "Blog 2 Title",
      image: "img/blog/blog2.jpg",
      content: "This is the content for Blog 2. Here you write another detailed post."
    },
    3: {
      title: "Blog 3 Title",
      image: "img/blog/blog3.jpg",
      content: "This is the content for Blog 3. Add the full blog content here."
    }
  };

  // Elements
  const navButtons = document.querySelectorAll("#blog-navigator .nav-btn");
  const blogThumbs = document.querySelectorAll("#blog .blog-thumb");
  const postTitle = document.getElementById("blog-post-title");
  const postImage = document.getElementById("blog-post-image");
  const postContent = document.getElementById("blog-post-content");

  function showBlogPost(id) {
    const post = blogPosts[id];
    if (!post) return;

    // Update blog post content
    postTitle.textContent = post.title;
    postImage.src = post.image;
    postImage.alt = post.title + " Image";
    postContent.textContent = post.content;

    // Update active state for navigator buttons
    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.post === id);
    });
  }

  // Add click events for navigator buttons and thumbnails
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => showBlogPost(btn.dataset.post));
  });

  blogThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => showBlogPost(thumb.dataset.post));
  });

  // Initialize first blog post
  showBlogPost("1");
</script>

