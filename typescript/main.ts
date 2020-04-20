import '../scss/style.scss';

import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import Game from './game';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;
controls.update();

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
const planeHelper = new THREE.PlaneHelper(plane, 100, 0xffff00);
scene.add(planeHelper);

const game = new Game(scene);

let lastTime = Date.now();

function animate(): void {
	requestAnimationFrame(animate);

	const currentTime = Date.now();
	const timeElapsed = currentTime - lastTime;

	game.doStep(timeElapsed);

	lastTime = currentTime;
	renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', (): void => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
