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

export interface Map {
	getNeighborhood(mid: Coordinate, neighborhood: Neighborhood): Array<Coordinate>;
	setObstacle(coordinate: Coordinate, obstacle: boolean): void;
	setFree(coordinate: Coordinate, free: boolean): void;
	isFree(coordinate: Coordinate): boolean;
};

export class ArrayMap implements Map {

	private fieldIsFree: boolean[][];

	constructor(width: number, height: number) {
		this.fieldIsFree = [];
		for(let x = 0; x < width; ++x) {
			let column: boolean[] = [];
			for(let y = 0; y < height; ++y) {
				column.push(true);
			}
			this.fieldIsFree.push(column);
		}
	}

	getNeighborhood(mid: Coordinate, neighborhood: Neighborhood): Array<Coordinate> {
		return neighborhood
			.getNeighbors(mid)
			.filter( (coordinate) => 
				coordinate.x >= 0 &&
				coordinate.x < this.fieldIsFree.length &&
				coordinate.y >= 0 &&
				coordinate.y < this.fieldIsFree[0].length
			 );
	}

	setObstacle(coordinate: Coordinate, obstacle: boolean): void {
		this.fieldIsFree[coordinate.x][coordinate.y] = !obstacle;
	}

	setFree(coordinate: Coordinate, free: boolean): void {
		this.fieldIsFree[coordinate.x][coordinate.y] = free;
	}

	isFree(coordinate: Coordinate): boolean {
		return this.fieldIsFree[coordinate.x][coordinate.y];
	}

};
