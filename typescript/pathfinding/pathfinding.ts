export class Coordinate {
	x : number;
	y : number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static left(from: Coordinate): Coordinate {
		return new Coordinate(from.x - 1, from.y);
	}

	static right(from: Coordinate): Coordinate {
		return new Coordinate(from.x + 1, from.y);
	}

	static above(from: Coordinate): Coordinate {
		return new Coordinate(from.x, from.y + 1);
	}

	static below(from: Coordinate): Coordinate {
		return new Coordinate(from.x, from.y - 1);
	}

	static topLeft(from: Coordinate): Coordinate {
		return new Coordinate(from.x - 1, from.y + 1);
	}

	static topRight(from: Coordinate): Coordinate {
		return new Coordinate(from.x + 1, from.y + 1);
	}

	static lowerLeft(from: Coordinate): Coordinate {
		return new Coordinate(from.x - 1, from.y - 1);
	}

	static lowerRight(from: Coordinate): Coordinate {
		return new Coordinate(from.x + 1, from.y - 1);
	}

}

export interface PathFindingAlgorithm{
	getPath(start: Coordinate, end: Coordinate): Array<Coordinate>;
};

export interface Neighborhood {
	getNeighbors(mid: Coordinate): Array<Coordinate>;
};

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
