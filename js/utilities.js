
(function (window) {
    'use strict';

    const Utilities = {
        /**
         * Debounce function for high-frequency events (resize, search input)
         */
        debounce(func, wait = 150) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        },

        /**
         * Generates an elegant inline SVG placeholder if external image fails
         */
        generateFallbackSvg(width = 800, height = 1000, label = 'CHANEL CONCEPT') {
            const encodedLabel = encodeURIComponent(label);
            return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23111111'/%3E%3Ccircle cx='${width / 2}' cy='${height / 2}' r='${Math.min(width, height) * 0.2}' fill='none' stroke='%23222222' stroke-width='1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='20' fill='%2377736d' letter-spacing='6'%3E${encodedLabel}%3C/text%3E%3Ctext x='50%25' y='${height / 2 + 35}' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23444444' letter-spacing='3'%3EDIGITAL CONCEPT%3C/text%3E%3C/svg%3E`;
        },

        /**
         * Attach fallback to all images on the page
         */
        bindImageErrorHandlers() {
            document.querySelectorAll('img').forEach((img) => {
                if (img.dataset.boundError) return;
                img.dataset.boundError = 'true';
                img.addEventListener('error', function () {
                    const altText = this.getAttribute('alt') || 'CHANEL CONCEPT';
                    this.src = Utilities.generateFallbackSvg(800, 1000, altText);
                    this.classList.add('is-fallback');
                }, { once: true });
            });
        },

        /**
         * Safe localStorage read
         */
        storageGet(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.warn('localStorage read error:', e);
                return defaultValue;
            }
        },

        /**
         * Safe localStorage write
         */
        storageSet(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('localStorage write error:', e);
            }
        },

        /**
         * Format currency for demo display
         */
        formatDemoPrice(price) {
            if (!price) return 'CONCEPT PIECE';
            return `€ ${price.toLocaleString()} · DEMO`;
        },

        /**
         * Check if device prefers reduced motion
         */
        prefersReducedMotion() {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        },

        /**
         * Check if current screen is mobile touch
         */
        isTouchDevice() {
            return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth <= 768;
        }
    };

    window.Utilities = Utilities;
})(window);
