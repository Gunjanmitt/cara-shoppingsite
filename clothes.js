// Auto-generated wardrobe configuration
import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.set(0, 1.6, 3);

// OPTIONAL: Add a mannequin/avatar
const geometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xfce4ec });
const avatar = new THREE.Mesh(geometry, material);
avatar.position.y = 1.25;
scene.add(avatar);

// Load Shirt Model
const loader = new GLTFLoader();
loader.load('img/products/t4.glb', function(gltf) {
  const shirt = gltf.scene;
  shirt.scale.set(1, 1, 1);
  shirt.position.y = 1.5; // Adjust to fit the mannequin
  scene.add(shirt);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
