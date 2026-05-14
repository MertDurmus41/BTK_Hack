import * as THREE from 'three';

/**
 * Three.js Scene Manager — isolated from React
 * All Three.js code lives here, never inside components
 */
export class AdSceneManager {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.scene    = new THREE.Scene();
    this.camera   = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 100);
    this.clock    = new THREE.Clock();
    this.meshes   = {};
    this.animationId = null;
  }

  loadAdTexture(imageUrl) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve, reject) => {
      loader.load(imageUrl, resolve, undefined, reject);
    });
  }

  async setAdPreview(imageUrl) {
    const texture = await this.loadAdTexture(imageUrl);
    if (this.meshes.adPlane) {
      this.meshes.adPlane.material.map = texture;
      this.meshes.adPlane.material.needsUpdate = true;
    } else {
      const geo = new THREE.PlaneGeometry(2, 2);
      const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      this.meshes.adPlane = new THREE.Mesh(geo, mat);
      this.scene.add(this.meshes.adPlane);
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    const t = this.clock.getElapsedTime();
    if (this.meshes.adPlane) {
      this.meshes.adPlane.rotation.y = Math.sin(t * 0.3) * 0.05;
      this.meshes.adPlane.position.y = Math.sin(t * 0.5) * 0.03;
    }
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
    Object.values(this.meshes).forEach(mesh => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
  }
}
