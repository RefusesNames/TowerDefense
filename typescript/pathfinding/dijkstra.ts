import {
	PathFindingAlgorithm,
	Coordinate,
	Neighborhood
} from './pathfinding';

export class Dijkstra implements PathFindingAlgorithm {

	private neighborhood : Neighborhood;

	constructor(neighborhood: Neighborhood) {
		this.neighborhood = neighborhood;
	}

	getPath(start: Coordinate, end: Coordinate): Array<Coordinate> {
		return [];
	}

}
