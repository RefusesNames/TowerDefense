import * as THREE from 'three';
import Enemy from './enemy';

const ENEMIES_PER_WAVE = 10;
const ENEMY_STARTING_POSITION = new THREE.Vector2(-50, -50);
const PLAYER_BASE_POSITION = new THREE.Vector2(50, 50);
const PLAYER_STARTING_HP = 20;
const SPAWN_PAUSE_MILLISEC = 1000;

export default class Game {
	public constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.enemies = new Array<Enemy>(ENEMIES_PER_WAVE);
		this.playerHp = PLAYER_STARTING_HP;
		this.gameLost = false;
		this.enemiesOfWaveSpawned = 0;
		this.lastEnemySpawnedAt = -1;
		this.spawnEnemy();
	}

	private scene: THREE.Scene;

	private enemies: Array<Enemy>;

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
		if (Date.now() - this.lastEnemySpawnedAt >= SPAWN_PAUSE_MILLISEC
			&& this.enemiesOfWaveSpawned < ENEMIES_PER_WAVE) {
			this.spawnEnemy();
		}

		this
			.enemies
			.filter((enemy: Enemy) => enemy.isAlive())
			.forEach((enemy: Enemy) => {
				enemy.move(milliSecElapsed);
				if (enemy.isAt(PLAYER_BASE_POSITION)) {
					this.enemyReachedPlayer(enemy);
				}
			});

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
