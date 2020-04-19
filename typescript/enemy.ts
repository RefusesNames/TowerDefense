import * as THREE from 'three';

class Enemy {
	private static readonly geometry = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);

	private readonly color = new THREE.MeshBasicMaterial({ color: 0xff0000 });

	private readonly mesh = new THREE.Mesh(Enemy.geometry, this.color);

	private readonly position = new THREE.Vector2(0, 0);

	// speed in units per millisecond
	private readonly SPEED = 0.01;

	private path: THREE.Vector2[] = [];

	private nextPathElementIndex = 0;

	constructor(x: number, y: number) {
		this.translate(new THREE.Vector2(x, y));
	}

	private translate(translation: THREE.Vector2): void {
		this.position.add(translation);

		const transformation = new THREE.Matrix4();
		transformation.identity();
		transformation.setPosition(translation.x, 0, translation.y);
		this.mesh.applyMatrix4(transformation);
	}

	public getObject3D(): THREE.Object3D {
		return this.mesh;
	}

	public setPath(path: THREE.Vector2[]): void {
		this.path = path;
		this.nextPathElementIndex = 0;
	}

	public move(milliSecElapsed: number): void {
		if (milliSecElapsed === 0 || this.nextPathElementIndex === this.path.length) {
			return;
		}

		const distanceToNext = this.position.distanceTo(this.path[this.nextPathElementIndex]);

		if (distanceToNext < 1.0e-3) {
			this.nextPathElementIndex += 1;
			return;
		}

		const direction = this.path[this.nextPathElementIndex].clone().sub(this.position).normalize();
		const distanceMoved = Math.min(milliSecElapsed * this.SPEED, distanceToNext);

		this.translate(direction.multiplyScalar(distanceMoved));
	}
}

export default Enemy;
