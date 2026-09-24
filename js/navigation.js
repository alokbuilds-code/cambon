/**
 * CHANEL — DIGITAL CONCEPT
 * Navigation & Fullscreen Editorial Menu (Sections 16–18)
 */

(function (window) {
    'use strict';

    class Navigation {
        constructor() {
            this.header = document.querySelector('.site-header');
            this.menuBtn = document.querySelector('.menu-btn');
            this.menuOverlay = document.querySelector('.editorial-menu-overlay');
            this.menuCloseBtn = document.querySelector('.menu-close-btn');
            this.previewContainer = document.querySelector('.menu-preview-backdrop');
            this.categoryLinks = document.querySelectorAll('.menu-category-item');

            this.scrollThreshold = 60;
            this.isMenuOpen = false;

            this.init();
        }

        init() {
            this.bindScroll();
            this.bindMenu();
            this.setupCategoryHoverPreviews();
        }

        bindScroll() {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                if (currentScroll > this.scrollThreshold) {
                    this.header.classList.add('is-scrolled');
                } else {
                    this.header.classList.remove('is-scrolled');
                }
            }, { passive: true });
        }

        bindMenu() {
            if (this.menuBtn) {
                this.menuBtn.addEventListener('click', () => this.openMenu());
            }

            if (this.menuCloseBtn) {
                this.menuCloseBtn.addEventListener('click', () => this.closeMenu());
            }

            // Keyboard ESC to close
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        }

        openMenu() {
            this.isMenuOpen = true;
            this.menuOverlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';

            // Animate category links in sequence with GSAP if available
            if (window.gsap) {
                gsap.fromTo('.menu-category-item', 
                    { opacity: 0, y: 35 }, 
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
                );
            }
        }

        closeMenu() {
            this.isMenuOpen = false;
            this.menuOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        setupCategoryHoverPreviews() {
            if (!this.previewContainer || !window.MenuCategories) return;

            // Generate image tags for all categories inside preview container
            this.previewContainer.innerHTML = '';
            window.MenuCategories.forEach((cat, index) => {
                const img = document.createElement('img');
                img.src = cat.image;
                img.alt = cat.label;
                img.className = 'menu-preview-img';
                img.dataset.categoryKey = cat.key;
                if (index === 0) img.classList.add('is-active'); // Default active image
                this.previewContainer.appendChild(img);
            });

            Utilities.bindImageErrorHandlers();

            // Bind mouseenter on category items to trigger cross-fade
            this.categoryLinks.forEach((item) => {
                const key = item.dataset.category;
                item.addEventListener('mouseenter', () => {
                    const allPreviews = this.previewContainer.querySelectorAll('.menu-preview-img');
                    allPreviews.forEach((img) => {
                        if (img.dataset.categoryKey === key) {
                            img.classList.add('is-active');
                        } else {
                            img.classList.remove('is-active');
                        }
                    });
                });
            });
        }
    }

    window.Navigation = Navigation;
})(window);
