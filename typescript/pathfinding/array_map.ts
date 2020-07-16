import {
	Map,
	Coordinate,
	Cell,
	Neighborhood
} from './pathfinding';
import {
	InvalidCoordinateException
} from './invalid_coordinate_exception';

export class ArrayMap<T> implements Map<T> {

	private field: Cell<T>[][];
	private width: number;
	private height: number;

	constructor(width: number, height: number, defaultData: T) {
		this.field = [];
		this.width = width;
		this.height = height;

		for(let x = 0; x < width; ++x) {
			let column: Cell<T>[] = [];
			for(let y = 0; y < height; ++y) {
				column.push({ isFree: true, data: defaultData });
			}
			this.field.push(column);
		}
	}

	getNeighborhood(mid: Coordinate, neighborhood: Neighborhood): Array<Coordinate> {
		if (mid.x < 0 || mid.x >= this.width ||
				mid.y < 0 || mid.y >= this.height)
			throw new InvalidCoordinateException(mid, this.width, this.height);

		return neighborhood
			.getNeighbors(mid)
			.filter( (coordinate) => 
				coordinate.x >= 0 &&
				coordinate.x < this.field.length &&
				coordinate.y >= 0 &&
				coordinate.y < this.field[0].length
			 );
	}

	setObstacle(coordinate: Coordinate, obstacle: boolean): void {
		if (coordinate.x < 0 || coordinate.x >= this.width ||
				coordinate.y < 0 || coordinate.y >= this.height)
			throw new InvalidCoordinateException(coordinate, this.width, this.height);

		this.field[coordinate.x][coordinate.y].isFree = !obstacle;
	}

	setFree(coordinate: Coordinate, free: boolean): void {
		if (coordinate.x < 0 || coordinate.x >= this.width ||
				coordinate.y < 0 || coordinate.y >= this.height)
			throw new InvalidCoordinateException(coordinate, this.width, this.height);

		this.field[coordinate.x][coordinate.y].isFree = free;
	}

	isFree(coordinate: Coordinate): boolean {
		if (coordinate.x < 0 || coordinate.x >= this.width ||
				coordinate.y < 0 || coordinate.y >= this.height)
			throw new InvalidCoordinateException(coordinate, this.width, this.height);

		return this.field[coordinate.x][coordinate.y].isFree;
	}

	setData(coordinate: Coordinate, data: T): void{
		if (coordinate.x < 0 || coordinate.x >= this.width ||
				coordinate.y < 0 || coordinate.y >= this.height)
			throw new InvalidCoordinateException(coordinate, this.width, this.height);

		this.field[coordinate.x][coordinate.y].data = data;
	}

	getData(coordinate: Coordinate): T {
		if (coordinate.x < 0 || coordinate.x >= this.width ||
				coordinate.y < 0 || coordinate.y >= this.height)
			throw new InvalidCoordinateException(coordinate, this.width, this.height);

		return this.field[coordinate.x][coordinate.y].data;
	}
}
