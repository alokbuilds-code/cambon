/**
 * CHANEL — DIGITAL CONCEPT
 * Custom Precision Cursor (Section 19)
 */

(function (window) {
    'use strict';

    class CustomCursor {
        constructor() {
            this.cursorEl = document.querySelector('.custom-cursor');
            this.cursorTextEl = document.querySelector('.cursor-text');
            
            // Check if cursor should be active
            if (!this.cursorEl || Utilities.isTouchDevice() || Utilities.prefersReducedMotion()) {
                if (this.cursorEl) this.cursorEl.style.display = 'none';
                return;
            }

            this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            this.speed = 0.22; // Lerp factor for buttery, weighted luxury movement
            this.isExpanded = false;
            this.currentText = '';

            this.init();
        }

        init() {
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            }, { passive: true });

            this.bindInteractiveElements();
            this.render();
        }

        bindInteractiveElements() {
            document.addEventListener('mouseover', (e) => {
                const target = e.target.closest('[data-cursor], a, button, .interactive-hover');
                if (target) {
                    const customText = target.getAttribute('data-cursor') || 
                                      (target.tagName === 'A' ? 'VIEW' : (target.tagName === 'BUTTON' ? 'OPEN' : ''));
                    this.expand(customText);
                }
            });

            document.addEventListener('mouseout', (e) => {
                const target = e.target.closest('[data-cursor], a, button, .interactive-hover');
                if (target) {
                    this.collapse();
                }
            });
        }

        expand(text = 'VIEW') {
            this.isExpanded = true;
            this.cursorEl.classList.add('is-expanded');
            if (this.cursorTextEl) {
                this.cursorTextEl.textContent = text;
            }
        }

        collapse() {
            this.isExpanded = false;
            this.cursorEl.classList.remove('is-expanded');
            if (this.cursorTextEl) {
                this.cursorTextEl.textContent = '';
            }
        }

        render() {
            // Smooth lerp
            this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
            this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

            this.cursorEl.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(() => this.render());
        }
    }

    window.CustomCursor = CustomCursor;
})(window);
