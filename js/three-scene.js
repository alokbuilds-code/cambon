/**
 * CHANEL — DIGITAL CONCEPT
 * Three.js Luxury Master Moment (Sections 32 & 33)
 * Abstract Parisian Haute Sculpture: Interlocking Lacquer & Gold Geometry
 */

(function (window) {
    'use strict';

    class LuxurySculptureScene {
        constructor() {
            this.container = document.getElementById('three-canvas-container');
            if (!this.container || typeof THREE === 'undefined' || Utilities.prefersReducedMotion()) {
                return;
            }

            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.sculptureGroup = null;
            this.animationFrameId = null;
            this.isRendering = false;
            this.isInitialized = false;

            this.setupObserver();
        }

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!this.isInitialized) {
                            this.initScene();
                        }
                        this.startRendering();
                    } else {
                        this.pauseRendering();
                    }
                });
            }, { rootMargin: '150px' });

            observer.observe(this.container);
        }

        initScene() {
            this.isInitialized = true;
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;

            // Scene
            this.scene = new THREE.Scene();

            // Camera
            this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
            this.camera.position.set(0, 0, 8.5);

            // WebGL Renderer
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.1;
            this.container.appendChild(this.renderer.domElement);

            // Lighting (Subtle, architectural gallery illumination)
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
            this.scene.add(ambientLight);

            const directionalLight1 = new THREE.DirectionalLight(0xf5eedb, 1.3);
            directionalLight1.position.set(5, 8, 4);
            this.scene.add(directionalLight1);

            const rimLight = new THREE.DirectionalLight(0xad9b72, 1.6);
            rimLight.position.set(-6, -4, -3);
            this.scene.add(rimLight);

            // Create Sculpture
            this.createSculpture();

            // Window resize handler
            window.addEventListener('resize', Utilities.debounce(() => this.onResize(), 150));
        }

        createSculpture() {
            this.sculptureGroup = new THREE.Group();

            // Materials
            // Black obsidian lacquer
            const lacquerMaterial = new THREE.MeshStandardMaterial({
                color: 0x0c0c0c,
                roughness: 0.15,
                metalness: 0.85
            });

            // Brushed Parisian Pale Gold Accent
            const goldMaterial = new THREE.MeshStandardMaterial({
                color: 0xad9b72,
                roughness: 0.32,
                metalness: 0.92
            });

            // Interlocking Ring 1 (Torus Knot with elegant proportions)
            const ringGeom1 = new THREE.TorusGeometry(2.1, 0.28, 48, 120);
            const ring1 = new THREE.Mesh(ringGeom1, lacquerMaterial);
            ring1.rotation.x = Math.PI / 3;
            ring1.rotation.y = Math.PI / 6;
            this.sculptureGroup.add(ring1);

            // Interlocking Ring 2
            const ringGeom2 = new THREE.TorusGeometry(2.1, 0.28, 48, 120);
            const ring2 = new THREE.Mesh(ringGeom2, lacquerMaterial);
            ring2.rotation.x = -Math.PI / 3;
            ring2.rotation.y = -Math.PI / 6;
            this.sculptureGroup.add(ring2);

            // Central Harmonic Core Ring (Subtle pale gold ribbon)
            const ribbonGeom = new THREE.TorusGeometry(1.4, 0.08, 32, 100);
            const ribbon = new THREE.Mesh(ribbonGeom, goldMaterial);
            ribbon.rotation.x = Math.PI / 2;
            this.sculptureGroup.add(ribbon);

            // Inner subtle sphere highlight
            const coreSphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.35, 32, 32),
                goldMaterial
            );
            this.sculptureGroup.add(coreSphere);

            this.scene.add(this.sculptureGroup);
        }

        startRendering() {
            if (this.isRendering) return;
            this.isRendering = true;
            this.renderLoop();
        }

        pauseRendering() {
            this.isRendering = false;
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        }

        renderLoop() {
            if (!this.isRendering) return;

            // Ultra-slow, weighted gallery rotation
            if (this.sculptureGroup) {
                this.sculptureGroup.rotation.y += 0.0032;
                this.sculptureGroup.rotation.x += 0.0016;
            }

            this.renderer.render(this.scene, this.camera);
            this.animationFrameId = requestAnimationFrame(() => this.renderLoop());
        }

        onResize() {
            if (!this.renderer || !this.camera || !this.container) return;
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }

        dispose() {
            this.pauseRendering();
            if (this.renderer && this.renderer.domElement) {
                this.renderer.dispose();
                this.container.removeChild(this.renderer.domElement);
            }
        }
    }

    window.LuxurySculptureScene = LuxurySculptureScene;
})(window);
