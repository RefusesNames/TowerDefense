import {
	PathFindingAlgorithm,
	Coordinate,
	Neighborhood,
	Map
} from './pathfinding';
import { MeshDistanceMaterial } from 'three';

export interface CellData {
  distanceTraveled: number,
	previous: Coordinate,
	visited: boolean
}

export class Dijkstra implements PathFindingAlgorithm {

	private neighborhood : Neighborhood;
	private map : Map<CellData>;

	private coordinatesToVisit : Array<Coordinate> = [];

	constructor(map: Map<CellData>, neighborhood: Neighborhood) {
		this.neighborhood = neighborhood;
		this.map = map;
	}

	getPath(start: Coordinate, end: Coordinate): Array<Coordinate> {
		this.traverseNeighborsToEnd(start, end);
		if (this.map.getData(end).visited) {
			return this.findBackwardsPath(start, end);
		} else {
			return [];
		}
	}

	private traverseNeighborsToEnd(mid: Coordinate, end: Coordinate): void {
		const previousData = this.map.getData(mid);
		previousData.visited = true;
		this.map.setData(mid, previousData); 

		if(mid.equals(end)) {
			return;
		}

		const unvisitedNeighbors = this.map.getNeighborhood(mid, this.neighborhood)
			.filter(neighbor => !this.map.getData(neighbor).visited)
			.filter(neighbor => this.map.isFree(neighbor));

		unvisitedNeighbors.forEach(neighbor => {
			const data = this.map.getData(neighbor);
			const distance = mid.distanceTo(neighbor) + this.map.getData(mid).distanceTraveled;
			if(distance < data.distanceTraveled || data.distanceTraveled === 0) {
				data.distanceTraveled = distance;
				data.previous = mid;
			}
			this.map.setData(neighbor, data);
		});

		;
		this.coordinatesToVisit.push(
			...unvisitedNeighbors.filter(neighbor => !this.coordinatesToVisit.some(coordinateToVisit => neighbor.distanceTo(coordinateToVisit) === 0))
		);

		const nextCoordinate = this.coordinatesToVisit.shift();
		if (nextCoordinate) {
			this.traverseNeighborsToEnd(nextCoordinate, end);
		}
	}

	private findBackwardsPath(start: Coordinate, end: Coordinate): Array<Coordinate> {
		let current = end;
		const path = [];
		while(!current.equals(start)) {
			path.unshift(current);
			current = this.map.getData(current).previous;
		}
		path.unshift(start);
		return path;
	}

}
