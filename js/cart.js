/**
 * CHANEL — DIGITAL CONCEPT
 * Shopping Bag & Drawer Experience (Section 37)
 */

(function (window) {
    'use strict';

    class Cart {
        constructor() {
            this.storageKey = 'chanel_digital_concept_cart';
            this.items = Utilities.storageGet(this.storageKey, []);
            
            this.drawer = document.querySelector('.cart-drawer');
            this.backdrop = document.querySelector('.cart-drawer-backdrop');
            this.openTriggers = document.querySelectorAll('.cart-open-trigger, .nav-cart-btn');
            this.closeTriggers = document.querySelectorAll('.cart-close-btn, .cart-drawer-backdrop');
            this.itemsContainer = document.querySelector('.cart-items-container');
            this.badgeElements = document.querySelectorAll('.cart-count-badge');
            this.subtotalElement = document.querySelector('.cart-subtotal-val');
            this.checkoutBtn = document.querySelector('.cart-checkout-btn');

            this.init();
        }

        init() {
            this.bindEvents();
            this.render();
        }

        bindEvents() {
            this.openTriggers.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            });

            this.closeTriggers.forEach((btn) => {
                btn.addEventListener('click', () => this.close());
            });

            if (this.checkoutBtn) {
                this.checkoutBtn.addEventListener('click', () => {
                    if (this.items.length === 0) return;
                    alert('CHANEL — DIGITAL CONCEPT\n\nThis is an unofficial creative concept demonstration.\nNo commercial checkout or payment processing exists.\n\nThank you for exploring this editorial concept.');
                });
            }

            // Keyboard ESC
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen()) {
                    this.close();
                }
            });
        }

        isOpen() {
            return this.drawer && this.drawer.classList.contains('is-open');
        }

        open() {
            if (this.drawer) this.drawer.classList.add('is-open');
            if (this.backdrop) this.backdrop.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        close() {
            if (this.drawer) this.drawer.classList.remove('is-open');
            if (this.backdrop) this.backdrop.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        addItem(productId, size = 'Standard', quantity = 1) {
            const product = (window.ProductsData || []).find(p => p.id === productId);
            if (!product) return;

            const existingIndex = this.items.findIndex(item => item.id === productId && item.size === size);
            if (existingIndex > -1) {
                this.items[existingIndex].quantity += quantity;
            } else {
                this.items.push({
                    id: product.id,
                    slug: product.slug,
                    title: product.title,
                    price: product.demoPrice,
                    image: product.primaryImage,
                    size: size,
                    quantity: quantity
                });
            }

            this.save();
            this.render();
            this.open();
        }

        updateQuantity(index, delta) {
            if (this.items[index]) {
                this.items[index].quantity += delta;
                if (this.items[index].quantity <= 0) {
                    this.removeItem(index);
                    return;
                }
                this.save();
                this.render();
            }
        }

        removeItem(index) {
            this.items.splice(index, 1);
            this.save();
            this.render();
        }

        save() {
            Utilities.storageSet(this.storageKey, this.items);
        }

        getTotalCount() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        }

        getSubtotal() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }

        render() {
            const count = this.getTotalCount();
            const subtotal = this.getSubtotal();

            // Update badge counts
            this.badgeElements.forEach((badge) => {
                badge.textContent = `(${count})`;
            });

            if (this.subtotalElement) {
                this.subtotalElement.textContent = `€ ${subtotal.toLocaleString()}`;
            }

            if (!this.itemsContainer) return;

            if (this.items.length === 0) {
                this.itemsContainer.innerHTML = `
                    <div class="cart-empty-message">
                        <p>Your bag is currently empty.</p>
                        <span class="micro-label">Discover the collection</span>
                    </div>
                `;
                return;
            }

            this.itemsContainer.innerHTML = this.items.map((item, index) => `
                <div class="cart-item-row" data-index="${index}">
                    <div class="cart-item-thumb">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <span class="cart-item-meta">Size: ${item.size}</span>
                        <div class="cart-item-qty">
                            <button type="button" class="qty-btn btn-qty-minus" data-action="minus" data-index="${index}" aria-label="Decrease quantity">−</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button type="button" class="qty-btn btn-qty-plus" data-action="plus" data-index="${index}" aria-label="Increase quantity">+</button>
                        </div>
                        <span class="cart-item-price">€ ${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <button type="button" class="cart-item-remove" data-action="remove" data-index="${index}" aria-label="Remove item">
                        Remove
                    </button>
                </div>
            `).join('');

            // Bind quantity and remove actions
            this.itemsContainer.querySelectorAll('[data-action]').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const action = e.currentTarget.dataset.action;
                    const idx = parseInt(e.currentTarget.dataset.index, 10);
                    if (action === 'minus') this.updateQuantity(idx, -1);
                    if (action === 'plus') this.updateQuantity(idx, 1);
                    if (action === 'remove') this.removeItem(idx);
                });
            });

            Utilities.bindImageErrorHandlers();
        }
    }

    window.Cart = Cart;
})(window);
