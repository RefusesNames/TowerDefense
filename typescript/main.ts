import '../scss/style.scss';

import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import Game from './game';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.y = 150;
controls.update();

const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

const game = new Game(
	scene,
	renderer.domElement,
	gridHelper,
	camera,
);

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
