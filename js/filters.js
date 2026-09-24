/**
 * CHANEL — DIGITAL CONCEPT
 * Category Filters & Catalog Controller (Section 39)
 */

(function (window) {
    'use strict';

    class CatalogFilters {
        constructor() {
            this.container = document.querySelector('.shop-products-grid');
            this.filterButtons = document.querySelectorAll('.catalog-filter-btn');
            this.activeCategory = 'all';

            if (!this.container) return;

            this.init();
        }

        init() {
            this.parseUrlCategory();
            this.bindFilterEvents();
            this.renderProducts(this.activeCategory, false);
        }

        parseUrlCategory() {
            const params = new URLSearchParams(window.location.search);
            const cat = params.get('cat');
            if (cat) {
                this.activeCategory = cat.toLowerCase();
            }
            this.updateActiveButtonState();
        }

        bindFilterEvents() {
            this.filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const selected = e.currentTarget.dataset.filter;
                    if (this.activeCategory === selected) return;

                    this.activeCategory = selected;
                    this.updateActiveButtonState();
                    this.renderProducts(this.activeCategory, true);

                    // Update URL silently
                    const newUrl = selected === 'all' 
                        ? window.location.pathname 
                        : `${window.location.pathname}?cat=${selected}`;
                    window.history.replaceState({}, '', newUrl);
                });
            });
        }

        updateActiveButtonState() {
            this.filterButtons.forEach(btn => {
                if (btn.dataset.filter === this.activeCategory) {
                    btn.classList.add('is-active');
                } else {
                    btn.classList.remove('is-active');
                }
            });
        }

        getFilteredProducts(category) {
            const all = window.ProductsData || [];
            if (category === 'all') return all;
            if (category === 'new') return all.filter(p => p.isNew);
            return all.filter(p => p.category.toLowerCase() === category);
        }

        renderProducts(category, animate = false) {
            const products = this.getFilteredProducts(category);

            if (animate && window.gsap) {
                gsap.to(this.container.children, {
                    opacity: 0,
                    y: 15,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => {
                        this.populateHtml(products);
                        gsap.fromTo(this.container.children,
                            { opacity: 0, y: 25 },
                            { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
                        );
                    }
                });
            } else {
                this.populateHtml(products);
            }
        }

        populateHtml(products) {
            if (products.length === 0) {
                this.container.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 5rem 0; text-align: center; color: var(--grey);">
                        <p style="font-family: var(--font-serif-subtle); font-style: italic; font-size: 1.6rem;">No concept pieces currently listed under this discipline.</p>
                    </div>
                `;
                return;
            }

            this.container.innerHTML = products.map((p) => `
                <article class="product-catalog-card" data-category="${p.category}">
                    <a href="product.html?id=${p.id}" class="catalog-card-media-wrap dual-image-wrap" data-cursor="VIEW">
                        <img src="${p.primaryImage}" alt="${p.title}" class="primary-img" loading="lazy">
                        <img src="${p.secondaryImage || p.primaryImage}" alt="${p.title} alternate angle" class="secondary-img" loading="lazy">
                        ${p.conceptTag ? `<span class="mono-tag" style="position: absolute; top: 12px; left: 12px; z-index: 5; background: rgba(8, 8, 8, 0.75); backdrop-filter: blur(4px);">${p.conceptTag}</span>` : ''}
                    </a>
                    <div class="catalog-card-info">
                        <div class="catalog-card-meta">
                            <span>${p.categoryLabel}</span>
                            <span>${Utilities.formatDemoPrice(p.demoPrice)}</span>
                        </div>
                        <h3 class="catalog-card-title">
                            <a href="product.html?id=${p.id}">${p.title}</a>
                        </h3>
                    </div>
                </article>
            `).join('');

            Utilities.bindImageErrorHandlers();
        }
    }

    window.CatalogFilters = CatalogFilters;
})(window);
