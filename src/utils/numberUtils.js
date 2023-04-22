// int and float utils

// int utils
export const isInt = value => {
	return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
};

// float utils
export const isFloat = value => {
	return !isNaN(value) && parseFloat(Number(value)) === value && !isNaN(parseFloat(value, 10));
};

// number utils
export const isNumber = value => {
	return isInt(value) || isFloat(value);
};

// years utils (int)
export const handleYearsChange = event => {
	const value = event.target.value;
	const number = Number(value.replace(/[^0-9]+/g, ''));
	return number;
};

// rate utils (float, 2 decimal places)
export const handleRateChange = event => {
	const value = event.target.value;
	const number = Number(value.replace(/[^0-9.]+/g, ''));
	return number;
};
