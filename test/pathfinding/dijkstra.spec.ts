import 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import { Dijkstra, CellData } from '../../typescript/pathfinding/dijkstra';
import { VonNeumannNeighborhood } from '../../typescript/pathfinding/neighborhood';
import { ArrayMap } from '../../typescript/pathfinding/array_map';
import { Map, Coordinate } from '../../typescript/pathfinding/pathfinding';

describe(`The Dijkstra pathfinding algorithm`, () => {

	let map : Map<CellData>;
	let dijkstra : Dijkstra;

	beforeEach(() => {
		map = new ArrayMap(10, 10, {
			distanceTraveled: 0,
			previous: new Coordinate(0,0),
			visited: false,
			toVisit: false
		});
		dijkstra = new Dijkstra(map, new VonNeumannNeighborhood); 
	});

	it('returns the start/end coordinate if both are the same', () => {
		const path = dijkstra.getPath(new Coordinate(0, 0), new Coordinate(0, 0));
		expect(path).to.have.lengthOf(1);
	});

	it('returns an empty path if there is no path', () => {
		map.setFree(new Coordinate(0, 1), false);
		map.setFree(new Coordinate(1, 1), false);
		map.setFree(new Coordinate(1, 0), false);
		const path = dijkstra.getPath(new Coordinate(0, 0), new Coordinate(2, 2));
		expect(path).to.be.empty;
	});

	it('returns the start and end coordinate if they are neighbors', () => {
		const start = new Coordinate(0, 0);
		const end = new Coordinate(0, 1);
		const path = dijkstra.getPath(start, end);
		expect(path).to.have.lengthOf(2);
		expect(path[0].distanceTo(start)).to.equal(0);
		expect(path[1].distanceTo(end)).to.equal(0);
	});

	it('works for straight lines without obstacles', () => {
		const start = new Coordinate(0, 0);
		const end = new Coordinate(0, 9);
		const path = dijkstra.getPath(start, end);
		expect(path).to.have.lengthOf(10);
		expect(path[0].distanceTo(start)).to.equal(0);
		expect(path[9].distanceTo(end)).to.equal(0);
	});

	it('finds a way around an obstacle on a straight line', () => {
		const start = new Coordinate(0, 0);
		const end = new Coordinate(0, 9);
		map.setFree(new Coordinate(0, 5), false);
		const path = dijkstra.getPath(start, end);
		expect(path).to.have.lengthOf(12);
		expect(path[0].distanceTo(start)).to.equal(0);
		expect(path[11].distanceTo(end)).to.equal(0);
	});

});
