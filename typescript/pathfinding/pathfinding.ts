export interface Coordinate {
	x : number;
	y : number;
}

export interface PathFindingAlgorithm{
	getPath(start: Coordinate, end: Coordinate): Array<Coordinate>;
};

export abstract class Neighborhood {

};

export interface Map {
	getNeighborhood(mid: Coordinate): Array<Coordinate>;
};
