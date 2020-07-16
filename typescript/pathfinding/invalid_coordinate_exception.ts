import { Coordinate } from './pathfinding';

export class InvalidCoordinateException extends Error {

	constructor(coordinate: Coordinate, mapWidth: number, mapHeight: number) {
		const message = `Invalid coordinate (${coordinate.x}, ${coordinate.y}) on map with dimensions (${mapWidth}, ${mapHeight})`;

		super(message);
	}

}
