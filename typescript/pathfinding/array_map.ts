import {
	Map,
	Coordinate,
	Cell,
	Neighborhood
} from './pathfinding';

export class ArrayMap<T> implements Map<T> {

	private field: Cell<T>[][];

	constructor(width: number, height: number, defaultData: T) {
		this.field = [];
		for(let x = 0; x < width; ++x) {
			let column: Cell<T>[] = [];
			for(let y = 0; y < height; ++y) {
				column.push({ isFree: true, data: defaultData });
			}
			this.field.push(column);
		}
	}

	getNeighborhood(mid: Coordinate, neighborhood: Neighborhood): Array<Coordinate> {
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
		this.field[coordinate.x][coordinate.y].isFree = !obstacle;
	}

	setFree(coordinate: Coordinate, free: boolean): void {
		this.field[coordinate.x][coordinate.y].isFree = free;
	}

	isFree(coordinate: Coordinate): boolean {
		return this.field[coordinate.x][coordinate.y].isFree;
	}

	setData(coordinate: Coordinate, data: T): void{
		this.field[coordinate.x][coordinate.y].data = data;
	}
	getData(coordinate: Coordinate): T {
		return this.field[coordinate.x][coordinate.y].data;
	}
}
