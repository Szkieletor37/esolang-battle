const assert = require('assert');
const shuffle = require('array-shuffle');
const math = require('mathjs');
const chunk = require('lodash/chunk');
const random = require('lodash/random');

module.exports.getPrecedingIndices = (cellIndex) => {
	return [Math.max(cellIndex - 1, 0), Math.min(cellIndex + 1, 24 * 14 - 1)];
};

const generateTestInput = () => chunk(
	shuffle([
		random(1, 9),
		...Array(11)
			.fill()
			.map(() => random(1, 99)),
	]),
	3
);

const getDeterminant = (vectors) => {
	const [A, B, C, D] = vectors;
	return math.det([
		math.subtract(B, A),
		math.subtract(C, A),
		math.subtract(D, A),
	]);
};

module.exports.generateInput = () => {
	let vectors = null;
	let determinant = null;
	while (true) {
		vectors = generateTestInput();
		determinant = getDeterminant(vectors);
		if (determinant % 6 === 0 && Math.abs(determinant) >= 30000) {
			break;
		}
	}

	const validVectors =
		determinant > 0
			? vectors
			: [vectors[0], vectors[1], vectors[3], vectors[2]];

	return validVectors
		.map(
			(vector) => `${vector
				.map((value) => value.toString(10).padStart(2, '0'))
				.join(' ')}\n`
		)
		.join('');
};

module.exports.isValidAnswer = (input, output) => {
	if (process.env.NODE_ENV !== 'production') {
		// return true;
	}

	const answer = getDeterminant(chunk(input.split(/\s/), 3)) / 6;
	assert(Number.isInteger(answer));
	assert(answer >= 5000);

	const correctOutput = answer.toString();

	// Trim
	const trimmedOutput = output
		.toString()
		.trim()
		.replace(/^0+/, '');
	console.log('info:', {input, correctOutput, output, trimmedOutput});

	return trimmedOutput === correctOutput;
};
