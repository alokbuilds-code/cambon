/**
 * CHANEL — DIGITAL CONCEPT
 * Cinematic Motion Choreography & Scroll-Driven Transformations
 * (Sections 03, 05, 08, 13, 15, 18, 25, 26, 45–47)
 */

(function (window) {
    'use strict';

    class ExperienceAnimations {
        constructor() {
            this.introEl = document.querySelector('.cinematic-intro');
            this.introTitle = document.querySelector('.intro-title');
            this.introSubtitle = document.querySelector('.intro-subtitle');
            this.introGlow = document.querySelector('.intro-breath-glow');
            this.introFragments = document.querySelectorAll('.intro-fragment');
            this.introBgText = document.querySelector('.intro-depth-bg-text');
            this.introPanelV = document.querySelector('.intro-panel-vertical');
            this.introPanelH = document.querySelector('.intro-panel-horizontal');
            this.skipBtn = document.querySelector('.intro-skip-btn');
            this.curtain = document.querySelector('.page-curtain');

            this.init();
        }

        init() {
            if (window.gsap && window.ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);
            }

            this.handleCinematicIntro();
            this.setupScrollTriggers();
            this.setupScrollTransformation();
            this.setupHorizontalRunway();
            this.setupMagneticInteractions();
            this.setupSubtle3DTilt();
            this.setupPageCurtainTransitions();
        }

        /**
         * Insane 5-Second Title Opening Sequence (Section 03)
         * BLACK -> tiny grain -> CHANEL -> letters stretch apart -> screen breathes ->
         * photographic fragments appear -> typography moves behind image -> screen splits ->
         * image takes over -> navigation emerges
         */
        handleCinematicIntro() {
            if (!this.introEl) return;

            const introSeen = sessionStorage.getItem('chanel_concept_intro_seen');
            if (Utilities.prefersReducedMotion() || introSeen === 'true') {
                this.introEl.style.display = 'none';
                this.revealHeroDirectly();
                return;
            }

            if (this.skipBtn) {
                this.skipBtn.addEventListener('click', () => {
                    sessionStorage.setItem('chanel_concept_intro_seen', 'true');
                    this.completeIntroInstantly();
                });
            }

            if (!window.gsap) {
                setTimeout(() => this.completeIntroInstantly(), 3000);
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem('chanel_concept_intro_seen', 'true');
                    this.introEl.style.display = 'none';
                }
            });

            // 0.0 - 0.7s: Pure Black, silent grain
            tl.to({}, { duration: 0.7 });

            // 0.7 - 2.0s: CHANEL enters with blur and physical presence
            tl.to(this.introTitle, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                letterSpacing: '0.22em',
                duration: 1.3,
                ease: 'power3.out'
            })
            .to(this.introSubtitle, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.5');

            // 2.0 - 2.8s: Letters stretch apart & screen begins breathing
            tl.to(this.introTitle, {
                letterSpacing: '0.38em',
                duration: 1.1,
                ease: 'power2.inOut'
            }, '+=0.1')
            .to(this.introGlow, {
                opacity: 1,
                scale: 1.15,
                duration: 1.2,
                ease: 'sine.inOut'
            }, '<')
            .to(this.introBgText, {
                opacity: 1,
                scale: 1.05,
                duration: 1.2,
                ease: 'power2.out'
            }, '<');

            // 2.8 - 3.8s: Photographic fragments cut in & typography moves into depth
            tl.to(this.introFragments, {
                opacity: 0.85,
                y: 0,
                scale: 1.0,
                duration: 1.0,
                stagger: 0.15,
                ease: 'expo.out'
            }, '-=0.4')
            .to(this.introTitle, {
                scale: 0.92,
                filter: 'blur(4px)',
                opacity: 0.35,
                duration: 0.8,
                ease: 'power2.in'
            }, '-=0.8');

            // 3.8 - 4.6s: Screen splits & fragments dissolve into hero
            tl.to(this.introPanelV, {
                xPercent: -105,
                duration: 1.2,
                ease: 'expo.inOut'
            }, '+=0.1')
            .to(this.introPanelH, {
                xPercent: 105,
                duration: 1.2,
                ease: 'expo.inOut'
            }, '<')
            .to(this.introFragments, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.5')
            .to(this.introTitle, {
                opacity: 0,
                duration: 0.4
            }, '<');

            // 4.6 - 5.5s: Campaign Hero image settles, navigation & micro labels emerge
            tl.fromTo('.hero-media',
                { scale: 1.08, filter: 'brightness(0.75)' },
                { scale: 1.00, filter: 'brightness(0.92)', duration: 1.6, ease: 'power3.out' },
                '-=0.8'
            )
            .fromTo('.site-header',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                '-=1.2'
            )
            .fromTo(['.hero-meta-top', '.hero-main-title', '.hero-actions-row'],
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
                '-=1.0'
            );
        }

        completeIntroInstantly() {
            if (this.introEl) this.introEl.style.display = 'none';
            this.revealHeroDirectly();
        }

        revealHeroDirectly() {
            if (!window.gsap) return;
            gsap.set('.hero-media', { scale: 1.00, filter: 'brightness(0.92)' });
            gsap.set('.site-header', { opacity: 1, y: 0 });
            gsap.set(['.hero-meta-top', '.hero-main-title', '.hero-actions-row'], { opacity: 1, y: 0 });
        }

        /**
         * Scroll-Based Composition Transformation (Sections 08 & 26)
         * Canvas box expands from small framed box to full screen with parallax shift
         */
        setupScrollTransformation() {
            const section = document.querySelector('.scroll-transformation-section');
            const canvasBox = document.querySelector('.transformation-canvas-box');
            const img = document.querySelector('.transformation-canvas-box img');
            const text = document.querySelector('.transformation-floating-text');

            if (!section || !canvasBox || Utilities.isTouchDevice() || !window.ScrollTrigger) return;

            const transformTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.2
                }
            });

            // Expand box smoothly to almost fullscreen
            transformTl.to(canvasBox, {
                width: '94vw',
                height: '90vh',
                borderRadius: '0px',
                ease: 'power2.inOut'
            })
            // Image un-zooms and regains richness
            .to(img, {
                scale: 1.0,
                filter: 'grayscale(0%) contrast(1.15)',
                ease: 'power2.inOut'
            }, 0)
            // Floating text scales gently and drifts
            .to(text, {
                scale: 1.1,
                y: -30,
                ease: 'power1.out'
            }, 0);
        }

        /**
         * ScrollTrigger Parallax Depth (Section 13)
         * Background (0.2x), Midground/Image (0.5x), Foreground (0.8x)
         */
        setupScrollTriggers() {
            if (!window.gsap || !window.ScrollTrigger || Utilities.prefersReducedMotion()) return;

            // Background typography layer parallax
            gsap.utils.toArray('.layer-bg-type, .editorial-bg-ghost-text, .hero-bg-typography-layer').forEach((bg) => {
                gsap.to(bg, {
                    scrollTrigger: {
                        trigger: bg.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    },
                    y: -120,
                    ease: 'none'
                });
            });

            // Image reveals with gentle clip-path and drift (Section 06)
            gsap.utils.toArray('.editorial-media-frame, .fragrance-media-wrap, .silence-image-wrap').forEach((frame) => {
                gsap.from(frame, {
                    scrollTrigger: {
                        trigger: frame,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 45,
                    duration: 1.4,
                    ease: 'power3.out'
                });
            });

            // Fullscreen typography moment slow zoom (Section 09)
            const typoMoment = document.querySelector('.fullscreen-typography-moment');
            if (typoMoment) {
                gsap.fromTo('.pure-typo-primary',
                    { scale: 0.94, opacity: 0.4 },
                    {
                        scrollTrigger: {
                            trigger: typoMoment,
                            start: 'top center',
                            end: 'bottom center',
                            scrub: 1.0
                        },
                        scale: 1.04,
                        opacity: 1,
                        ease: 'none'
                    }
                );
            }
        }

        /**
         * Signature Horizontal Footwear Runway (Section 25 & 26)
         */
        setupHorizontalRunway() {
            const container = document.querySelector('.horizontal-scroll-container');
            const track = document.querySelector('.horizontal-track');
            const bgType = document.querySelector('.horizontal-bg-typography');

            if (!container || !track || Utilities.isTouchDevice() || !window.ScrollTrigger) return;

            const totalScroll = track.scrollWidth - window.innerWidth;
            if (totalScroll <= 0) return;

            const runwayTl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${totalScroll + 500}`,
                    pin: true,
                    scrub: 1.1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            runwayTl.to(track, {
                x: () => -totalScroll,
                ease: 'none'
            });

            if (bgType) {
                runwayTl.to(bgType, {
                    x: () => -totalScroll * 0.35,
                    ease: 'none'
                }, 0);
            }
        }

        /**
         * Subtle Magnetic Interaction (Section 15: 5–12px max movement)
         */
        setupMagneticInteractions() {
            if (Utilities.isTouchDevice() || Utilities.prefersReducedMotion()) return;

            const magneticEls = document.querySelectorAll('.btn-magnetic, .btn-pill, .menu-btn, .footer-sound-control');

            magneticEls.forEach((el) => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const deltaX = (e.clientX - centerX) * 0.22;
                    const deltaY = (e.clientY - centerY) * 0.22;

                    // Clamp to max 10px
                    const clampedX = Math.max(-10, Math.min(10, deltaX));
                    const clampedY = Math.max(-10, Math.min(10, deltaY));

                    el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'translate3d(0, 0, 0)';
                    el.style.transition = 'transform 0.4s var(--ease-out-power3)';
                });

                el.addEventListener('mouseenter', () => {
                    el.style.transition = 'none';
                });
            });
        }

        /**
         * Subtle 3D Perspective Tilt on Featured Visuals (Section 05)
         */
        setupSubtle3DTilt() {
            if (Utilities.isTouchDevice() || Utilities.prefersReducedMotion()) return;

            const tiltCards = document.querySelectorAll('.product-focus-media, .editorial-media-frame');

            tiltCards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
                    card.style.transition = 'transform 0.8s var(--ease-out-power3)';
                });

                card.addEventListener('mouseenter', () => {
                    card.style.transition = 'none';
                });
            });
        }

        /**
         * Page Curtain Transitions (Section 18 & 45)
         */
        setupPageCurtainTransitions() {
            if (!this.curtain || Utilities.prefersReducedMotion()) return;

            const links = document.querySelectorAll('a[href$=".html"], a[href="./"], a[href="index.html"], a[href="shop.html"], a[href="product.html"], a[href="collection.html"], a[href="about.html"]');
            
            links.forEach((link) => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (!href || href.startsWith('#') || link.target === '_blank') return;

                    e.preventDefault();

                    if (!window.gsap) {
                        window.location.href = href;
                        return;
                    }

                    const tl = gsap.timeline({
                        onComplete: () => {
                            window.location.href = href;
                        }
                    });

                    tl.set(this.curtain, { yPercent: 100 })
                      .to(this.curtain, {
                          yPercent: 0,
                          duration: 0.75,
                          ease: 'power4.inOut'
                      })
                      .to('.curtain-logo', {
                          opacity: 1,
                          duration: 0.3
                      }, '-=0.2')
                      .to('.curtain-sub', {
                          opacity: 1,
                          duration: 0.25
                      }, '-=0.1');
                });
            });
        }
    }

    window.ExperienceAnimations = ExperienceAnimations;
})(window);
