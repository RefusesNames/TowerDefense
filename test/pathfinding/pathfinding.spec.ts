import 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import { Dijkstra } from '../../typescript/pathfinding/dijkstra';
import {
	VonNeumannNeighborhood,
	MooreNeighborhood,
	Coordinate
} from '../../typescript/pathfinding/pathfinding';

const algorithms = [ Dijkstra ];


algorithms.forEach((Algorithm) => {

	describe(`The ${Algorithm.name} pathfinding algorithm`, () => {

		it('returns the start/end coordinate if both are the same', () => {
			expect.fail();
		});

		it('throws an exception if there is no path', () => {
			expect.fail();
		});

		it('returns the start and end coordinate if they are neighbors', () => {
			expect.fail();
		});

		it('works for straight lines without obstacles', () => {
			expect.fail();
		});

		it('finds a way around an obstacle on a straight line', () => {
			expect.fail();
		});

	});
});

	const distance = (coord1: Coordinate, coord2: Coordinate) => 
		Math.sqrt((coord1.x - coord2.x) * (coord1.x - coord2.x) + (coord1.y - coord2.y) * (coord1.y - coord2.y));

describe('The VonNeumannNeighborhood', () => {

	it('returns exactly 4 Coordinates', () => {
		const neighborhood = new VonNeumannNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors({ x: 0, y: 0 });
		expect(neighborCoordinates).to.have.lengthOf(4);
	});
	
	it('returns all neighbors with exactly 1 distance from the given Coordinate', () => {
		const mid = { x: 0, y: 0 };
		const neighborhood = new VonNeumannNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors(mid);
		neighborCoordinates.forEach(neighborCoordinate => {
			expect(distance(mid, neighborCoordinate)).to.equal(1);
		});
	});

});

describe('The MooreNeighborhood', () => {

	it('returns exactly 8 Coordinates', () => {
		const neighborhood = new MooreNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors({ x: 0, y: 0 });
		expect(neighborCoordinates).to.have.lengthOf(8);
	});
	
	it('returns all neighbors with exactly 1 or sqrt(2) distance from the given Coordinate', () => {
		const mid = { x: 0, y: 0 };
		const neighborhood = new MooreNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors(mid);
		neighborCoordinates.forEach(neighborCoordinate => {
			expect(distance(mid, neighborCoordinate)).to.be.oneOf([ 1, Math.sqrt(2) ]);
		});
	});

});


