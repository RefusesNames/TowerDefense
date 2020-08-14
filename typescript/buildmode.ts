import * as THREE from 'three';
import Tower from './tower';
import { Map, Coordinate } from './pathfinding/pathfinding';
import { ArrayMap } from './pathfinding/array_map';
import { CellData } from './pathfinding/dijkstra';

export default class BuildMode {
	constructor(
		scene: THREE.Scene,
		towers: Array<Tower>,
		canvas: HTMLElement,
		plane: THREE.Object3D,
		camera: THREE.Camera,
	) {
		this.scene = scene;
		this.towers = towers;
		this.plane = plane;
		this.camera = camera;
		this.canvas = canvas;
		BuildMode.towerPreview.visible = false;
		this.obstacleMap = new ArrayMap<CellData>(100, 100, {
			distanceTraveled : 0,
			previous: new Coordinate(0, 0),
			visited: false
		});

		this.scene.add(BuildMode.towerPreview);

		canvas.addEventListener('mousemove', this.onMouseMove);
		canvas.addEventListener('mousedown', this.onMouseDown);
	}

	private readonly scene: THREE.Scene;

	private readonly towers: Array<Tower>;

	public readonly obstacleMap : Map<CellData>;

	private readonly plane: THREE.Object3D;

	private readonly camera: THREE.Camera;

	private readonly raycaster = new THREE.Raycaster();

	private readonly mouse = new THREE.Vector2();

	private readonly canvas: HTMLElement;

	private static readonly towerPreview = new THREE.Mesh(
		Tower.geometry,
		new THREE.MeshBasicMaterial({
			transparent: true,
			color: 0xaaaaaa,
			opacity: 0.5,
		}),
	);

	private onMouseDown = (): void => {
		const { onBoard, position } = this.tryGetMousePositionOnGrid();
		if (!onBoard) {
			return;
		}

		const roundedPosition = new THREE.Vector2(
			Math.round(position.x),
			Math.round(position.z),
		);

		const towerAlreadyThere: boolean = this.towers
			.map((tower: Tower) => tower.getPosition().distanceTo(roundedPosition) < 1e-3)
			.reduce(
				(oneWasTooClose: boolean, thisIsTooClose: boolean) => oneWasTooClose || thisIsTooClose,
			);

		if (!towerAlreadyThere) {
			const newTower = new Tower(roundedPosition);
			this.obstacleMap.setObstacle(new Coordinate(roundedPosition.x, roundedPosition.y), true);

			this.towers.push(newTower);
			this.scene.add(newTower.getObject3D());
		}
	}

	private onMouseMove = (mouseEvent: MouseEvent): void => {
		this.mouse.x = (mouseEvent.clientX / this.canvas.clientWidth) * 2 - 1;
		this.mouse.y = -(mouseEvent.clientY / this.canvas.clientHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, this.camera);

		const { onBoard, position } = this.tryGetMousePositionOnGrid();

		if (!onBoard) {
			BuildMode.towerPreview.visible = false;
			return;
		}

		position.setY(0);
		const toMove = position.sub(BuildMode.towerPreview.position);
		const transformation = new THREE.Matrix4().identity();
		transformation.setPosition(
			new THREE.Vector3(
				Math.round(toMove.x),
				Math.round(toMove.y),
				Math.round(toMove.z),
			),
		);

		BuildMode.towerPreview.visible = true;
		BuildMode.towerPreview.applyMatrix4(transformation);
	}

	private tryGetMousePositionOnGrid = (): {
		onBoard: boolean;
		position: THREE.Vector3;
	} => {
		const intersected = this.raycaster.intersectObject(this.plane);

		if (intersected.length === 0) {
			BuildMode.towerPreview.visible = false;
			return {
				onBoard: false,
				position: new THREE.Vector3(),
			};
		}


		const intersectionPoint = intersected[0].point;
		intersectionPoint.setY(0);
		return {
			onBoard: true,
			position: intersectionPoint,
		};
	}
}
