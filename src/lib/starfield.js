import * as THREE from "three";

export function createStarfield(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 700;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) starPositions[i] = (Math.random() - 0.5) * 2000;
  starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  camera.position.z = 500;

  let animationFrameId;
  let isDisposed = false;

  function animate() {
    if (isDisposed) return;
    
    animationFrameId = requestAnimationFrame(animate);
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;
    
    try {
      renderer.render(scene, camera);
    } catch (e) {
      // Ignore transient WebGL errors during development
      // These can happen during hot reloads or when the canvas is temporarily detached
      console.debug("WebGL render warning (safe to ignore in dev):", e.message);
    }
  }

  const handleResize = () => {
    if (isDisposed) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", handleResize);
  animate();

  // Return cleanup function to prevent memory leaks
  return () => {
    isDisposed = true;
    window.removeEventListener("resize", handleResize);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    // Clean up Three.js resources
    renderer.dispose();
    starsGeometry.dispose();
    starsMaterial.dispose();
  };
}
