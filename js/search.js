/**
 * CHANEL — DIGITAL CONCEPT
 * Fullscreen Debounced Search Experience (Section 38)
 */

(function (window) {
    'use strict';

    class Search {
        constructor() {
            this.modal = document.querySelector('.search-modal');
            this.openTriggers = document.querySelectorAll('.search-open-trigger, .nav-search-btn');
            this.closeBtn = document.querySelector('.search-modal-close');
            this.input = document.querySelector('.search-input');
            this.resultsGrid = document.querySelector('.search-results-grid');
            this.resultsWrapper = document.querySelector('.search-results-wrapper');

            this.init();
        }

        init() {
            this.bindEvents();
        }

        bindEvents() {
            this.openTriggers.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            });

            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.close());
            }

            if (this.input) {
                this.input.addEventListener('input', Utilities.debounce((e) => {
                    this.performSearch(e.target.value.trim());
                }, 180));
            }

            // Keyboard ESC
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal && this.modal.classList.contains('is-open')) {
                    this.close();
                }
            });
        }

        open() {
            if (this.modal) {
                this.modal.classList.add('is-open');
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    if (this.input) this.input.focus();
                }, 200);
            }
        }

        close() {
            if (this.modal) {
                this.modal.classList.remove('is-open');
                document.body.style.overflow = '';
                if (this.input) this.input.value = '';
                if (this.resultsGrid) this.resultsGrid.innerHTML = '';
            }
        }

        performSearch(query) {
            if (!this.resultsGrid) return;

            if (!query) {
                this.resultsGrid.innerHTML = '';
                return;
            }

            const lowerQuery = query.toLowerCase();
            const products = window.ProductsData || [];
            const results = products.filter(p => 
                p.title.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery) ||
                p.categoryLabel.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            );

            if (results.length === 0) {
                this.resultsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 3rem 0; color: var(--grey); text-align: center;">
                        <p style="font-family: var(--font-serif-subtle); font-style: italic; font-size: 1.4rem;">No pieces matching “${query}” found.</p>
                        <span class="micro-label" style="margin-top: 0.5rem; display: block;">Try exploring Handbags, Footwear, or Fragrance</span>
                    </div>
                `;
                return;
            }

            this.resultsGrid.innerHTML = results.map(p => `
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

    window.Search = Search;
})(window);
