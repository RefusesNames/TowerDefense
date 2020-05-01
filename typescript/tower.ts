import * as THREE from 'three';
import Enemy from './enemy';
import Shot from './shot';

const RANGE = 10;
const RELOAD_TIME_MILLI_SEC = 500;

export default class Tower {
	public static readonly geometry = new THREE.ConeGeometry(0.5, 1).translate(0, 0.5, 0);

	private readonly material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

	private readonly mesh = new THREE.Mesh(Tower.geometry, this.material);

	private readonly position = new THREE.Vector2(0, 0);

	private lastShotAt = -1;

	private currentTarget: Enemy | null = null;

	constructor(translation: THREE.Vector2) {
		this.position.add(translation);

		const transformation = new THREE.Matrix4();
		transformation.identity();
		transformation.setPosition(translation.x, 0, translation.y);
		this.mesh.applyMatrix4(transformation);
	}

	public getObject3D(): THREE.Object3D {
		return this.mesh;
	}

	public isInRange(enemy: Enemy): boolean {
		return this.position.distanceTo(enemy.getPosition()) <= RANGE;
	}

	public targetIsInRange(): boolean {
		if (this.currentTarget === null) {
			return false;
		}
		return this.isInRange(this.currentTarget);
	}

	public hasShotReady(): boolean {
		return Date.now() - this.lastShotAt > RELOAD_TIME_MILLI_SEC;
	}

	public setTarget(enemy: Enemy | null): void {
		this.currentTarget = enemy;
	}

	public getTarget(): Enemy | null {
		return this.currentTarget;
	}

	public hasTarget(): boolean {
		return this.currentTarget !== null;
	}

	public shoot(): Shot {
		this.lastShotAt = Date.now();
		return new Shot(this.position.clone(), this.currentTarget as Enemy);
	}

	public getPosition(): THREE.Vector2 {
		return this.position;
	}
}
