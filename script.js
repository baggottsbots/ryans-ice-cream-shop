tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'bebas': ['Bebas Neue', 'sans-serif'],
            'blackhan': ['Black Han Sans', 'sans-serif']
          },
          colors: {
            'gangster-bg': '#0a0a0a',
            'gold-drip': '#D4AF37',
            'silver-shine': '#C0C0C0',
            'cream-dream': '#FFF8E7',
            'card-dark': '#1a1a1a'
          },
          animation: {
            'gold-drip': 'drip 2s ease-in-out infinite',
            'float-ice': 'float 6s ease-in-out infinite',
            'glow-pulse': 'glow 2s ease-in-out infinite alternate'
          }
        }
      }
    }

let cart = [];
    let subtotal = 0;

    function addToCart(name, price, description) {
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, description, quantity: 1 });
      }
      updateCart();
    }

    function updateCart() {
      const cartItems = document.getElementById('cartItems');
      const subtotalEl = document.getElementById('subtotal');
      const totalEl = document.getElementById('totalAmount');
      const checkoutForm = document.getElementById('checkoutForm');
      const emptyCart = document.getElementById('emptyCart');

      subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = document.getElementById('delivery').checked ? 3.99 : 0;
      const total = subtotal + deliveryFee;

      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;

      if (cart.length > 0) {
        emptyCart.style.display = 'none';
        checkoutForm.classList.remove('hidden');
        cartItems.innerHTML = cart.map((item, index) => `
          <div class="flex justify-between items-center bg-gangster-bg p-6 rounded-2xl border border-gold-drip/30">
            <div>
              <h4 class="font-bold text-xl text-gold-drip">${item.name}</h4>
              <p class="text-silver-shine">${item.description}</p>
            </div>
            <div class="flex items-center space-x-4">
              <button onclick="updateQuantity(${index}, -1)" class="w-12 h-12 bg-gold-drip/50 hover:bg-gold-drip rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300">-</button>
              <span class="font-bold text-2xl text-gold-drip w-12 text-center">${item.quantity}</span>
              <button onclick="updateQuantity(${index}, 1)" class="w-12 h-12 bg-gold-drip/50 hover:bg-gold-drip rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300">+</button>
              <div class="font-bold text-xl text-gold-drip">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        `).join('');
      } else {
        emptyCart.style.display = 'block';
        checkoutForm.classList.add('hidden');
      }
    }

    function updateQuantity(index, change) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      updateCart();
    }

    document.getElementById('processCheckout').addEventListener('click', function() {
      const email = document.getElementById('buyerEmail').value;
      const name = document.getElementById('buyerName').value || 'Customer';
      if (!email) {
        alert('Please enter your email');
        return;
      }
      const deliveryFee = document.getElementById('delivery').checked ? 3.99 : 0;
      const total = subtotal + deliveryFee;
      const deliveryType = document.getElementById('delivery').checked ? 'Delivery' : 'Pickup';
      
      window.__processPayment({
        amountCents: Math.round(total * 100),
        email: email,
        productName: `Ryan\'s Ice Cream Order (${deliveryType})`,
        productDescription: `Cart total: $${subtotal.toFixed(2)} + ${deliveryType.toLowerCase()} fee`,
        name: name,
        quantity: 1
      });
    });

    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
      radio.addEventListener('change', updateCart);
    });

    function captureEmail() {
      const email = document.getElementById('emailCapture').value;
      if (email) {
        alert('Thanks! You\'ll be notified when online ordering launches.');
        document.getElementById('emailCapture').value = '';
      }
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });