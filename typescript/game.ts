import * as THREE from 'three';
import Enemy from './enemy';
import Tower from './tower';
import Shot from './shot';

const ENEMIES_PER_WAVE = 10;
const ENEMY_STARTING_POSITION = new THREE.Vector2(-50, -50);
const PLAYER_BASE_POSITION = new THREE.Vector2(50, 50);
const PLAYER_STARTING_HP = 20;
const SPAWN_PAUSE_MILLISEC = 1000;

export default class Game {
	public constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.enemies = new Array<Enemy>(ENEMIES_PER_WAVE);
		this.towers = new Array<Tower>();
		this.shots = new Array<Shot>();
		this.playerHp = PLAYER_STARTING_HP;
		this.gameLost = false;
		this.enemiesOfWaveSpawned = 0;
		this.lastEnemySpawnedAt = -1;
		this.spawnEnemy();

		const tower = new Tower(new THREE.Vector2(5, 5));
		this.towers.push(tower);
		scene.add(tower.getObject3D());
	}

	private scene: THREE.Scene;

	private enemies: Array<Enemy>;

	private towers: Array<Tower>;

	private shots: Array<Shot>;

	private playerHp: number;

	private gameLost: boolean;

	private enemiesOfWaveSpawned: number;

	private lastEnemySpawnedAt: number;

	private spawnEnemy(): void {
		const enemy = new Enemy(ENEMY_STARTING_POSITION);
		enemy.setPath([
			ENEMY_STARTING_POSITION,
			PLAYER_BASE_POSITION,
		]);
		this.scene.add(enemy.getObject3D());
		this.enemies[this.enemiesOfWaveSpawned] = enemy;
		this.enemiesOfWaveSpawned += 1;
		this.lastEnemySpawnedAt = Date.now();
	}

	public doStep(milliSecElapsed: number): void {
		this.spawnEnemies();
		this.towersShoot();
		this.moveShots(milliSecElapsed);
		this.moveEnemies(milliSecElapsed);
		this.enemiesReachPlayer();
	}

	private spawnEnemies(): void {
		if (Date.now() - this.lastEnemySpawnedAt >= SPAWN_PAUSE_MILLISEC
			&& this.enemiesOfWaveSpawned < ENEMIES_PER_WAVE) {
			this.spawnEnemy();
		}
	}

	private towersShoot(): void {
		// check if target is out of range or dead
		this.towers
			.filter((tower: Tower) => tower.hasTarget())
			.forEach((tower: Tower) => {
				if (!tower.targetIsInRange() || !tower.getTarget()?.isAlive()) {
					tower.setTarget(null);
				}
			});

		// find target in range
		this.towers
			.filter((tower: Tower) => !tower.hasTarget())
			.forEach((tower: Tower) => {
				for (const enemy of this.enemies) {
					if (enemy && enemy.isAlive() && tower.isInRange(enemy)) {
						tower.setTarget(enemy);
						break;
					}
				}
			});

		// shoot
		this.towers.forEach((tower: Tower) => {
			if (tower.hasTarget() && tower.targetIsInRange() && tower.hasShotReady()) {
				const shot = tower.shoot();
				this.scene.add(shot.getObject3D());
				this.shots.push(shot);
			}
		});
	}

	private moveShots(milliSecElapsed: number): void {
		this.shots.forEach((shot: Shot) => {
			shot.move(milliSecElapsed);
			if (shot.hasHit()) {
				shot.getTarget().die();
				this.scene.remove(shot.getTarget().getObject3D());
				this.scene.remove(shot.getObject3D());
				shot.die();
			}
		});
		this.shots = this.shots.filter((shot: Shot) => shot.isAlive());
	}

	private moveEnemies(milliSecElapsed: number): void {
		this
			.enemies
			.filter((enemy: Enemy) => enemy.isAlive())
			.forEach((enemy: Enemy) => {
				enemy.move(milliSecElapsed);
				if (enemy.isAt(PLAYER_BASE_POSITION)) {
					this.enemyReachedPlayer(enemy);
				}
			});
	}

	private enemiesReachPlayer(): void {
		if (this.enemies.filter((enemy: Enemy) => enemy.isAlive()).length === 0
			&& !this.gameLost) {
			this.enemiesOfWaveSpawned = 0;
		}
	}

	private enemyReachedPlayer(enemy: Enemy): void {
		this.playerHp -= 1;
		enemy.die();
		this.scene.remove(enemy.getObject3D());
		if (this.playerHp === 0) {
			this.gameLost = true;
			console.log('GAME LOST');
		}
	}
}
