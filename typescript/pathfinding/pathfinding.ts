export interface Coordinate {
	x : number;
	y : number;
}

export interface PathFindingAlgorithm{
	getPath(start: Coordinate, end: Coordinate): Array<Coordinate>;
};

export abstract class Neighborhood {
	abstract getNeighbors(mid: Coordinate): Array<Coordinate>;
};

export class VonNeumannNeighborhood extends Neighborhood {

	getNeighbors(mid: Coordinate): Array<Coordinate> {
		return [
			{ x: mid.x - 1, y: mid.y },
			{ x: mid.x + 1, y: mid.y },
			{ x: mid.x, y: mid.y - 1 },
			{ x: mid.x, y: mid.y + 1},
		];
	}

}

export class MooreNeighborhood extends Neighborhood {

	getNeighbors(mid: Coordinate): Array<Coordinate> {
		return [
			{ x: mid.x - 1, y: mid.y - 1 },
			{ x: mid.x - 1, y: mid.y },
			{ x: mid.x - 1, y: mid.y + 1 },
			{ x: mid.x, y: mid.y - 1 },
			{ x: mid.x, y: mid.y + 1 },
			{ x: mid.x + 1, y: mid.y - 1 },
			{ x: mid.x + 1, y: mid.y },
			{ x: mid.x + 1, y: mid.y + 1 },
		];
	}

}

export interface Map<T> {
	getNeighborhood(mid: Coordinate, neighborhood: Neighborhood): Array<Coordinate>;
	setObstacle(coordinate: Coordinate, obstacle: boolean): void;
	setFree(coordinate: Coordinate, free: boolean): void;
	isFree(coordinate: Coordinate): boolean;
	setData(coordinate: Coordinate, data: T): void;
	getData(coordinate: Coordinate): T;
};

export interface Cell<T> {
	isFree: boolean,
	data: T
};
