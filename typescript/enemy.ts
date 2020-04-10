import * as THREE from 'three';

class Enemy {
	private static readonly geometry = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);

	private readonly color = new THREE.MeshBasicMaterial({ color: 0xff0000 });

	private readonly mesh = new THREE.Mesh(Enemy.geometry, this.color);

	private readonly position = new THREE.Vector2(0, 0);

	private readonly matrix = new THREE.Matrix4();

	constructor(x: number, y: number) {
		this.setPosition(x, y);
		this.mesh.applyMatrix4(this.matrix);
	}

	public setPosition(x: number, y: number): void {
		this.position.x = x;
		this.position.y = y;

		this.updateMatrix();
	}

	private updateMatrix(): void {
		this.matrix.setPosition(new THREE.Vector3(this.position.x, this.position.y, 0));
	}

	public getObject3D(): THREE.Object3D {
		return this.mesh;
	}
}

export default Enemy;
