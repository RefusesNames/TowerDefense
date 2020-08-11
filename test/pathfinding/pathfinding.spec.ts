import 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import { Dijkstra } from '../../typescript/pathfinding/dijkstra';
const algorithms = [ Dijkstra ];


algorithms.forEach((Algorithm) => {

	describe(`The ${Algorithm.name} pathfinding algorithm`, () => {

		//it('returns the start/end coordinate if both are the same', () => {
			//expect.fail();
		//});

		//it('throws an exception if there is no path', () => {
			//expect.fail();
		//});

		//it('returns the start and end coordinate if they are neighbors', () => {
			//expect.fail();
		//});

		//it('works for straight lines without obstacles', () => {
			//expect.fail();
		//});

		//it('finds a way around an obstacle on a straight line', () => {
			//expect.fail();
		//});

	});
});

