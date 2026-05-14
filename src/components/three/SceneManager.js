import * as THREE from 'three';

export class AdSceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    // Support responsive sizing based on parent container
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 400;
    
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    this.scene = new THREE.Scene();
    
    // Camera setup for a flat object looking head-on
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.z = 3.5;
    
    this.clock = new THREE.Clock();
    this.meshes = {};
    
    // Mouse tracking for tilt
    this.mouse = new THREE.Vector2(0, 0);
    this.targetRotation = new THREE.Vector2(0, 0);
    
    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.addEventListener('mousemove', this.handleMouseMove);

    // Handle resize
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(canvas.parentElement || document.body);
  }

  handleMouseMove(event) {
    // Normalize mouse coordinates to -1 to +1
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Limit rotation tilt
    this.targetRotation.x = this.mouse.y * 0.15; // Vertical tilt
    this.targetRotation.y = this.mouse.x * 0.15; // Horizontal tilt
  }

  handleResize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height, false);
  }

  loadAdTexture(imageUrl) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        imageUrl, 
        (texture) => {
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          resolve(texture);
        }, 
        undefined, 
        reject
      );
    });
  }

  async setAdPreview(imageUrl) {
    const texture = await this.loadAdTexture(imageUrl);
    const aspect = texture.image.width / texture.image.height;
    
    // Adjust plane geometry based on image aspect ratio
    let width = 2;
    let height = 2;
    if (aspect > 1) {
      height = width / aspect;
    } else {
      width = height * aspect;
    }

    if (this.meshes.adGroup) {
      // Cleanup existing
      this.scene.remove(this.meshes.adGroup);
      this.meshes.adGroup.children.forEach(c => {
        c.geometry.dispose();
        c.material.dispose();
      });
    }

    this.meshes.adGroup = new THREE.Group();

    // 1. Main Image Plane
    const geo = new THREE.PlaneGeometry(width, height);
    const mat = new THREE.MeshBasicMaterial({ 
      map: texture, 
      transparent: true,
      side: THREE.DoubleSide
    });
    this.meshes.adPlane = new THREE.Mesh(geo, mat);
    this.meshes.adGroup.add(this.meshes.adPlane);

    // 2. Glow Edges (slightly larger plane behind it)
    const glowGeo = new THREE.PlaneGeometry(width + 0.1, height + 0.1);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7c3aed'), // var(--accent-violet)
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    this.meshes.glowPlane = new THREE.Mesh(glowGeo, glowMat);
    this.meshes.glowPlane.position.z = -0.05;
    this.meshes.adGroup.add(this.meshes.glowPlane);

    this.scene.add(this.meshes.adGroup);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.meshes.adGroup) {
      // Lerp rotation towards target for smooth physics-like movement
      this.meshes.adGroup.rotation.x += (this.targetRotation.x - this.meshes.adGroup.rotation.x) * 0.05;
      this.meshes.adGroup.rotation.y += (this.targetRotation.y - this.meshes.adGroup.rotation.y) * 0.05;
      
      // Add subtle continuous floating animation
      const t = this.clock.getElapsedTime();
      this.meshes.adGroup.position.y = Math.sin(t * 1.5) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('mousemove', this.handleMouseMove);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    this.renderer.dispose();
    
    if (this.meshes.adGroup) {
      this.meshes.adGroup.children.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (mesh.material.map) mesh.material.map.dispose();
          mesh.material.dispose();
        }
      });
    }
  }
}
