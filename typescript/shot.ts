import * as THREE from 'three';
import Enemy from './enemy';

const SIZE = 0.1;
const SPEED = 0.05;

export default class Shot {
	private static readonly geometry = new THREE.SphereGeometry(SIZE).translate(0, 0.5, 0);

	private readonly material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

	private readonly mesh = new THREE.Mesh(Shot.geometry, this.material);

	private readonly position = new THREE.Vector2(0, 0);

	private target: Enemy;

	private alive = true;

	constructor(translation: THREE.Vector2, target: Enemy) {
		this.translate(translation);

		this.target = target;
	}

	public getObject3D(): THREE.Object3D {
		return this.mesh;
	}

	public getTarget(): Enemy {
		return this.target;
	}

	public move(milliSecElapsed: number): void {
		const distanceToEnemy = this.position.distanceTo(this.target.getPosition());
		const direction = this.target.getPosition().sub(this.position).normalize();
		const distanceToMove = Math.min(milliSecElapsed * SPEED, distanceToEnemy);

		this.translate(direction.multiplyScalar(distanceToMove));
	}

	public hasHit(): boolean {
		return this.target.isAt(this.position);
	}

	public isAlive(): boolean {
		return this.alive;
	}

	public die(): void {
		this.alive = false;
	}

	private translate(translation: THREE.Vector2): void {
		this.position.add(translation);

		const transformation = new THREE.Matrix4();
		transformation.identity();
		transformation.setPosition(translation.x, 0, translation.y);
		this.mesh.applyMatrix4(transformation);
	}
}
