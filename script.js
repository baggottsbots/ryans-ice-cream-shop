tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'bebas': ['"Bebas Neue"', 'sans-serif'],
                        'blackhan': ['"Black Han Sans"', 'sans-serif']
                    },
                    colors: {
                        'gangster-black': '#0a0a0a',
                        'gold-drip': '#D4AF37',
                        'chrome': '#C0C0C0',
                        'cream-pop': '#FFF8E7'
                    },
                    animation: {
                        'drip-gold': 'drip 2s ease-in-out infinite',
                        'float-scoop': 'float 6s ease-in-out infinite',
                        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
                        'smoke': 'smoke 8s linear infinite'
                    },
                    keyframes: {
                        drip: {
                            '0%, 100%': { transform: 'translateY(0px) skew(0deg)', filter: 'hue-rotate(0deg)' },
                            '50%': { transform: 'translateY(10px) skew(-5deg)', filter: 'hue-rotate(10deg)' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translateY(-20px) rotate(2deg)' }
                        },
                        glow: {
                            '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
                            '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)' }
                        },
                        smoke: {
                            '0%': { opacity: 0.3, transform: 'translateX(0) translateY(0) scale(1)' },
                            '50%': { opacity: 0.1, transform: 'translateX(20px) translateY(-10px) scale(1.1)' },
                            '100%': { opacity: 0.3, transform: 'translateX(40px) translateY(-20px) scale(1.2)' }
                        }
                    }
                }
            }
        }

// Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10,10,10,0.98)';
            } else {
                header.style.background = 'rgba(10,10,10,0.95)';
            }
        });

        // Cart functionality
        let cart = [];
        let subtotal = 0;

        function addToCart(name, priceCents) {
            cart.push({name, priceCents, quantity: 1});
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const subtotalEl = document.getElementById('subtotal');
            
            subtotal = cart.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);
            subtotalEl.textContent = `$${ (subtotal / 100).toFixed(2) }`;
            
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="flex items-center justify-between p-4 bg-chrome/10 rounded-xl">
                    <div>
                        <div class="font-bold">${item.name}</div>
                        <div class="text-sm text-chrome">$${ (item.priceCents / 100).toFixed(2) } x ${item.quantity}</div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateQuantity(${index}, -1)" class="w-8 h-8 bg-red-600/50 hover:bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">-</button>
                        <span class="font-bold w-8 text-center">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="w-8 h-8 bg-green-600/50 hover:bg-green-600 text-white rounded-lg flex items-center justify-center text-sm">+</button>
                    </div>
                </div>
            `).join('');
        }

        function updateQuantity(index, change) {
            if (cart[index].quantity + change > 0) {
                cart[index].quantity += change;
                updateCart();
            } else {
                cart.splice(index, 1);
                updateCart();
            }
        }

        function notifyLaunch() {
            const email = document.getElementById('notify-email').value;
            if (email) {
                alert('Thanks! You\'ll be notified when e-commerce launches.');
                document.getElementById('notify-email').value = '';
            }
        }

        function bookCatering(packageName, amountCents) {
            const email = prompt('Enter your email to book:');
            const name = prompt('Enter your name:');
            if (email && name) {
                if (window.__processPayment) {
                    window.__processPayment({
                        amountCents: amountCents,
                        email: email,
                        productName: `${packageName} Catering Package`,
                        productDescription: `Ryan's Ice Cream Shop ${packageName} catering package`,
                        name: name,
                        quantity: 1
                    });
                } else {
                    alert('Booking confirmed! We\'ll contact you shortly.');
                }
            }
        }

        // Pickup/Delivery toggle
        document.getElementById('pickup-btn').addEventListener('click', function() {
            this.classList.add('bg-green-600/40', 'border-green-600', 'text-green-200');
            this.classList.remove('bg-green-600/20', 'border-green-600/50', 'text-green-300');
            document.getElementById('delivery-btn').classList.remove('bg-blue-600/40', 'border-blue-600', 'text-blue-200');
            document.getElementById('delivery-btn').classList.add('bg-blue-600/20', 'border-blue-600/50', 'text-blue-300');
        });

        document.getElementById('delivery-btn').addEventListener('click', function() {
            this.classList.add('bg-blue-600/40', 'border-blue-600', 'text-blue-200');
            this.classList.remove('bg-blue-600/20', 'border-blue-600/50', 'text-blue-300');
            document.getElementById('pickup-btn').classList.remove('bg-green-600/40', 'border-green-600', 'text-green-200');
            document.getElementById('pickup-btn').classList.add('bg-green-600/20', 'border-green-600/50', 'text-green-300');
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.animate-float-scoop');
            parallax.forEach(el => {
                el.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.01}deg)`;
            });
        });