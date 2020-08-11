import 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {
	VonNeumannNeighborhood,
	MooreNeighborhood,
} from '../../typescript/pathfinding/neighborhood';

import {
	Coordinate
} from '../../typescript/pathfinding/pathfinding';

const zeroCoordinate = new Coordinate(0, 0);

describe('The VonNeumannNeighborhood', () => {

	it('returns exactly 4 Coordinates', () => {
		const neighborhood = new VonNeumannNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors(zeroCoordinate);
		expect(neighborCoordinates).to.have.lengthOf(4);
	});
	
	it('returns all neighbors with exactly 1 distance from the given Coordinate', () => {
		const neighborhood = new VonNeumannNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors(zeroCoordinate);
		neighborCoordinates.forEach(neighborCoordinate => {
			expect(zeroCoordinate.distanceTo(neighborCoordinate)).to.equal(1);
		});
	});

});

describe('The MooreNeighborhood', () => {

	it('returns exactly 8 Coordinates', () => {
		const neighborhood = new MooreNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors(zeroCoordinate);
		expect(neighborCoordinates).to.have.lengthOf(8);
	});
	
	it('returns all neighbors with exactly 1 or sqrt(2) distance from the given Coordinate', () => {
		const neighborhood = new MooreNeighborhood();
		const neighborCoordinates = neighborhood.getNeighbors(zeroCoordinate);
		neighborCoordinates.forEach(neighborCoordinate => {
			expect(zeroCoordinate.distanceTo(neighborCoordinate)).to.be.oneOf([ 1, Math.sqrt(2) ]);
		});
	});

});

