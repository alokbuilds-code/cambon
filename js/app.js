/**
 * CHANEL — DIGITAL CONCEPT
 * Master Application Orchestrator & Web Audio Ambient Engine
 */

(function (window) {
    'use strict';

    /**
     * Web Audio API Minimalist Ambient Engine (Section 43)
     * Pure synthesized warm harmonic drone + gentle crystalline chime
     * Strictly user-triggered, silent by default.
     */
    class AmbientAudioEngine {
        constructor() {
            this.audioCtx = null;
            this.masterGain = null;
            this.isPlaying = false;
            this.oscillators = [];
            this.soundToggleBtn = document.querySelector('.footer-sound-control');
            this.soundLabel = document.querySelector('.sound-toggle-label');

            this.init();
        }

        init() {
            if (!this.soundToggleBtn) return;

            this.soundToggleBtn.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.stop();
                } else {
                    this.start();
                }
            });
        }

        setupAudio() {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return false;

            this.audioCtx = new AudioContext();
            this.masterGain = this.audioCtx.createGain();
            this.masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);

            // Subtle lowpass filter for silky Parisian atmosphere
            const filter = this.audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

            this.masterGain.connect(filter);
            filter.connect(this.audioCtx.destination);

            return true;
        }

        start() {
            if (!this.audioCtx) {
                const ok = this.setupAudio();
                if (!ok) return;
            }

            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            // Create gentle harmonic drones: 110Hz (A2), 164.81Hz (E3), 220Hz (A3)
            const freqs = [110, 164.81, 220];
            this.oscillators = freqs.map((freq, i) => {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

                gain.gain.setValueAtTime(0.02 / (i + 1), this.audioCtx.currentTime);
                osc.connect(gain);
                gain.connect(this.masterGain);

                osc.start();
                return osc;
            });

            // Smooth fade-in
            this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 2.5);

            this.isPlaying = true;
            this.updateUi();
        }

        stop() {
            if (!this.audioCtx) return;

            // Smooth fade-out
            this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);
            setTimeout(() => {
                this.oscillators.forEach(osc => {
                    try { osc.stop(); osc.disconnect(); } catch (e) {}
                });
                this.oscillators = [];
                this.isPlaying = false;
                this.updateUi();
            }, 1200);
        }

        updateUi() {
            if (!this.soundToggleBtn) return;
            if (this.isPlaying) {
                this.soundToggleBtn.classList.add('is-playing');
                if (this.soundLabel) this.soundLabel.textContent = 'SOUND ON';
            } else {
                this.soundToggleBtn.classList.remove('is-playing');
                if (this.soundLabel) this.soundLabel.textContent = 'SOUND OFF';
            }
        }
    }

    /**
     * Product Detail Page View Controller (Section 34–36)
     */
    class ProductPageController {
        constructor() {
            this.container = document.querySelector('.product-detail-page');
            if (!this.container) return;

            this.productId = this.getProductIdFromUrl();
            this.selectedProduct = null;
            this.selectedSize = null;

            this.init();
        }

        getProductIdFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id') || 'handbag-01';
        }

        init() {
            const allProducts = window.ProductsData || [];
            this.selectedProduct = allProducts.find(p => p.id === this.productId) || allProducts[0];
            this.selectedSize = this.selectedProduct.sizes ? this.selectedProduct.sizes[0] : 'Standard';

            this.renderProductDetails();
            this.bindGalleryInteractions();
            this.bindSizeSelector();
            this.bindAddToCart();
            this.bindAccordions();
            this.renderRelatedPieces();
        }

        renderProductDetails() {
            const p = this.selectedProduct;
            document.title = `${p.title} — CHANEL Digital Concept`;

            // Elements
            const titleEl = document.querySelector('.product-info-title');
            const catEl = document.querySelector('.product-info-category');
            const priceEl = document.querySelector('.product-info-price-text');
            const descEl = document.querySelector('.product-info-desc');
            const mainImg = document.querySelector('.product-gallery-main img');
            const thumbWrap = document.querySelector('.product-thumbnails-row');
            const sizesGrid = document.querySelector('.size-options-grid');
            const matDesc = document.querySelector('.accordion-material-text');
            const craftDesc = document.querySelector('.accordion-craft-text');

            if (titleEl) titleEl.textContent = p.title;
            if (catEl) catEl.textContent = `${p.categoryLabel} · ${p.conceptTag}`;
            if (priceEl) priceEl.textContent = `€ ${p.demoPrice ? p.demoPrice.toLocaleString() : 'N/A'}`;
            if (descEl) descEl.textContent = p.description;
            if (matDesc) matDesc.textContent = p.materials || 'Selected archival grade materials.';
            if (craftDesc) craftDesc.textContent = p.craft || 'Handcrafted in Paris atelier.';

            // Main image
            if (mainImg) {
                mainImg.src = p.primaryImage;
                mainImg.alt = p.title;
            }

            // Thumbnails
            if (thumbWrap) {
                const images = [p.primaryImage, p.secondaryImage, p.detailImage].filter(Boolean);
                thumbWrap.innerHTML = images.map((imgSrc, idx) => `
                    <button type="button" class="product-thumb-btn ${idx === 0 ? 'is-active' : ''}" data-src="${imgSrc}">
                        <img src="${imgSrc}" alt="${p.title} view ${idx + 1}">
                    </button>
                `).join('');
            }

            // Sizes
            if (sizesGrid && p.sizes) {
                sizesGrid.innerHTML = p.sizes.map((s, idx) => `
                    <button type="button" class="size-option-btn ${idx === 0 ? 'is-active' : ''}" data-size="${s}">
                        ${s}
                    </button>
                `).join('');
            }

            Utilities.bindImageErrorHandlers();
        }

        bindGalleryInteractions() {
            const mainImg = document.querySelector('.product-gallery-main img');
            const thumbs = document.querySelectorAll('.product-thumb-btn');

            thumbs.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbs.forEach(t => t.classList.remove('is-active'));
                    thumb.classList.add('is-active');

                    const newSrc = thumb.dataset.src;
                    if (mainImg && newSrc) {
                        mainImg.style.opacity = '0';
                        setTimeout(() => {
                            mainImg.src = newSrc;
                            mainImg.style.opacity = '1';
                        }, 220);
                    }
                });
            });
        }

        bindSizeSelector() {
            const sizeBtns = document.querySelectorAll('.size-option-btn');
            sizeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizeBtns.forEach(b => b.classList.remove('is-active'));
                    btn.classList.add('is-active');
                    this.selectedSize = btn.dataset.size;
                });
            });
        }

        bindAddToCart() {
            const addBtn = document.querySelector('.btn-add-to-cart');
            if (!addBtn) return;

            addBtn.addEventListener('click', () => {
                if (window.app && window.app.cart) {
                    window.app.cart.addItem(this.selectedProduct.id, this.selectedSize, 1);
                }
            });
        }

        bindAccordions() {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.closest('.accordion-item');
                    item.classList.toggle('is-open');
                });
            });
        }

        renderRelatedPieces() {
            const grid = document.querySelector('.related-pieces-grid');
            if (!grid) return;

            const allProducts = window.ProductsData || [];
            const related = allProducts
                .filter(p => p.id !== this.selectedProduct.id)
                .slice(0, 4);

            grid.innerHTML = related.map(p => `
                <a href="product.html?id=${p.id}" class="search-result-item" data-cursor="VIEW">
                    <div class="search-result-thumb">
                        <img src="${p.primaryImage}" alt="${p.title}" loading="lazy">
                    </div>
                    <div class="search-result-meta">
                        <span>${p.categoryLabel}</span>
                        <span>${Utilities.formatDemoPrice(p.demoPrice)}</span>
                    </div>
                    <h4 class="search-result-title">${p.title}</h4>
                </a>
            `).join('');

            Utilities.bindImageErrorHandlers();
        }
    }

    /**
     * Master Initialization
     */
    document.addEventListener('DOMContentLoaded', () => {
        Utilities.bindImageErrorHandlers();

        window.app = {
            cursor: new CustomCursor(),
            navigation: new Navigation(),
            cart: new Cart(),
            search: new Search(),
            filters: new CatalogFilters(),
            animations: new ExperienceAnimations(),
            threeScene: new LuxurySculptureScene(),
            audioEngine: new AmbientAudioEngine(),
            productPage: new ProductPageController()
        };
    });

})(window);
