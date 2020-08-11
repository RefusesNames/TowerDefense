import {
	Neighborhood,
	Coordinate
} from './pathfinding';

export class VonNeumannNeighborhood implements Neighborhood {

	getNeighbors(mid: Coordinate): Array<Coordinate> {
		return [
			Coordinate.left(mid),
			Coordinate.right(mid),
			Coordinate.above(mid),
			Coordinate.below(mid)
		];
	}

}

export class MooreNeighborhood implements Neighborhood {

	getNeighbors(mid: Coordinate): Array<Coordinate> {
		return [
			Coordinate.left(mid),
			Coordinate.right(mid),
			Coordinate.above(mid),
			Coordinate.below(mid),
			Coordinate.lowerLeft(mid),
			Coordinate.lowerRight(mid),
			Coordinate.topLeft(mid),
			Coordinate.topRight(mid)
		];
	}

}
