import 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {
	Neighborhood,
	Coordinate
} from '../../typescript/pathfinding/pathfinding';
import { InvalidCoordinateException } from '../../typescript/pathfinding/invalid_coordinate_exception';

import { ArrayMap } from '../../typescript/pathfinding/array_map';

describe('ArrayMap', () => {
	let map : ArrayMap<{}>;
	const width = 1;
	const height = 1;

	beforeEach(() => {
		map = new ArrayMap<{}>(width, height, {});
	});

	describe('getNeighbors', () => {

		let neighborhood : Neighborhood;
		const zeroCoordinate = new Coordinate(0, 0);

		it ('does not return a neighbor with x < 0', () => {
			neighborhood = {
				getNeighbors: (mid: Coordinate): Array<Coordinate> => {
					return [
						Coordinate.left(mid)
					]
				}
			};

			expect(map.getNeighborhood(zeroCoordinate, neighborhood)).to.have.lengthOf(0);
		});

		it ('does not return a neighbor with y < 0', () => {
			neighborhood = {
				getNeighbors: (mid: Coordinate): Array<Coordinate> => {
					return [
						Coordinate.below(mid)
					]
				}
			};

			expect(map.getNeighborhood(zeroCoordinate, neighborhood)).to.have.lengthOf(0);
		});

		it ('does not return a neighbor with x >= width', () => {
			neighborhood = {
				getNeighbors: (mid: Coordinate): Array<Coordinate> => {
					return [
						Coordinate.right(mid)
					]
				}
			};

			expect(map.getNeighborhood(zeroCoordinate, neighborhood)).to.have.lengthOf(0);
		});

		it ('does not return a neighbor with y >= width', () => {
			neighborhood = {
				getNeighbors: (mid: Coordinate): Array<Coordinate> => {
					return [
						Coordinate.above(mid)
					]
				}
			};

			expect(map.getNeighborhood(zeroCoordinate, neighborhood)).to.have.lengthOf(0);
		});

		it ('returns valid neighbors', () => {
			map = new ArrayMap<{}>(3, 3, {})
			neighborhood = {
				getNeighbors: (mid: Coordinate): Array<Coordinate> => {
					return [
						Coordinate.above(mid),
						Coordinate.left(mid),
						Coordinate.right(mid),
						Coordinate.below(mid)
					]
				}
			};

			const result = map.getNeighborhood(new Coordinate(1, 1), neighborhood);
			expect(result).to.have.lengthOf(4);
		});

		it ('throws an InvalidCoordinateException if the coordinate is not on the map', () => {
			const mid = new Coordinate(10, 10);
			expect(() => { map.getNeighborhood(mid, neighborhood) }).to.throw(/.*Invalid coordinate.*/);

		});

	});

	 describe('setObstacle', () => {

		it ('throws an InvalidCoordinateException if the coordinate is not on the map', () => {
			const mid = new Coordinate(10, 10);
			expect(() => { map.setObstacle(mid, true) }).to.throw(/.*Invalid coordinate.*/);
		});

	 });

	 describe('setFree', () => {

		it ('throws an InvalidCoordinateException if the coordinate is not on the map', () => {
			const mid = new Coordinate(10, 10);
			expect(() => { map.setFree(mid, true) }).to.throw(/.*Invalid coordinate.*/);
		});

	 });

	 describe('isFree', () => {

		it ('throws an InvalidCoordinateException if the coordinate is not on the map', () => {
			const mid = new Coordinate(10, 10);
			expect(() => { map.isFree(mid) }).to.throw(/.*Invalid coordinate.*/);
		});

	 });

	 describe('setData', () => {

		it ('throws an InvalidCoordinateException if the coordinate is not on the map', () => {
			const mid = new Coordinate(10, 10);
			expect(() => { map.setData(mid, {}) }).to.throw(/.*Invalid coordinate.*/);
		});

	 });

	 describe('getData', () => {

		it ('throws an InvalidCoordinateException if the coordinate is not on the map', () => {
			const mid = new Coordinate(10, 10);
			expect(() => { map.getData(mid) }).to.throw(/.*Invalid coordinate.*/);
		});

	 });

});

