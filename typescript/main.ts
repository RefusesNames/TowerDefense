import '../scss/style.scss';

import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import Enemy from './enemy';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const enemy = new Enemy(0, 0);
scene.add(enemy.getObject3D());
enemy.setPath([
	new THREE.Vector2(0, 0),
	new THREE.Vector2(10, 0),
	new THREE.Vector2(10, 10),
	new THREE.Vector2(0, 10),
	new THREE.Vector2(0, 0),
]);

const enemy2 = new Enemy(10, 0);
scene.add(enemy2.getObject3D());

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;
controls.update();

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
const planeHelper = new THREE.PlaneHelper(plane, 100, 0xffff00);
scene.add(planeHelper);

let lastTime = Date.now();

function animate(): void {
	requestAnimationFrame(animate);

	const currentTime = Date.now();
	const timeElapsed = currentTime - lastTime;

	enemy.move(timeElapsed);
	lastTime = currentTime;
	renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', (): void => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
