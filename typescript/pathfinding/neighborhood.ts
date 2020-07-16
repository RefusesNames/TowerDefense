import {
	Neighborhood,
	Coordinate
} from './pathfinding';

export class VonNeumannNeighborhood implements Neighborhood {

	getNeighbors(mid: Coordinate): Array<Coordinate> {
		return [
			{ x: mid.x - 1, y: mid.y },
			{ x: mid.x + 1, y: mid.y },
			{ x: mid.x, y: mid.y - 1 },
			{ x: mid.x, y: mid.y + 1},
		];
	}

}

export class MooreNeighborhood implements Neighborhood {

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
