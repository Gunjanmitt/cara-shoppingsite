<script src="cart.js"></script>
// Simple Cart Handling using localStorage
document.addEventListener('DOMContentLoaded', () => {
  const cartButtons = document.querySelectorAll('.add-to-cart');

  cartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const title = productCard.querySelector('h3').innerText;
      const price = productCard.querySelector('.price').innerText;
      const img = productCard.querySelector('img').src;
      const size = productCard.querySelector('select')?.value || 'M';

      const item = { title, price, img, size };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${title} added to cart!`);
    });
  });
});
