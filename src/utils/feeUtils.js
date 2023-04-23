const MIN_AMOUNT = 1000000; // 1,000,000

// fee map
const feeRates = [
	{ name: 'Less than $1M | 1%', threshold: MIN_AMOUNT, rate: 0.01 },
	{ name: 'Between $1M & $2.5M | 0.85%', threshold: 2500000, rate: 0.0085 },
	{ name: 'Between $2.5M & $5M | 0.75%', threshold: 5000000, rate: 0.0075 },
	{ name: 'Between $5M & $10M | 0.50%', threshold: 10000000, rate: 0.005 },
	{ name: 'Between $10M & $25M | 0.25%', threshold: 25000000, rate: 0.0025 },
	{ name: 'Over $25M | 0.15%', threshold: null, rate: 0.0015 }, // anything over 25,000,000
];

export const getMinAmount = () => MIN_AMOUNT;

// calculate fee
// each buckets fees are calculated individually, then added together
// E.g. 3,000,000 is calculated as:
// 1,000,000 * 0.01
// 1,500,000 * 0.0085
// 1,500,000 * 0.0075
// so the total fee is 1,000,000 * 0.01 + 1,500,000 * 0.0085 + 1,500,000 * 0.0075
export const calcTotalFee = amount => {
	let fee = 0;
	let remainingAmount = amount;
	let currentThreshold = 0;
	feeRates.forEach(rate => {
		const { threshold, rate: feeRate } = rate;
		const amountInBucket = threshold
			? Math.min(threshold - currentThreshold, remainingAmount)
			: remainingAmount;
		fee += amountInBucket * feeRate;
		remainingAmount -= amountInBucket;
		currentThreshold = threshold;
	});
	return fee;
};

// generate fee map
export const generateFeeMap = amount => {
	let feeMap = [];
	let remainingAmount = amount;
	let currentThreshold = 0;
	feeRates.forEach((rate, order) => {
		const { name, threshold, rate: feeRate } = rate;
		const amountInBucket = threshold
			? Math.min(threshold - currentThreshold, remainingAmount)
			: remainingAmount;
		feeMap.push({
			order,
			name: name,
			fee: amountInBucket * feeRate,
		});
		remainingAmount -= amountInBucket;
		currentThreshold = threshold;
	});

	return feeMap;
};
