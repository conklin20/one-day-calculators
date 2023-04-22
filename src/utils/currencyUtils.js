// helper functions for currency

// convert a number to a currency string
export function toCurrencyString(number) {
	return number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	});
}

// handle currency input change to conver from string, to number
export function handleCurrencyChange(event) {
	const value = event.target.value;
	const number = Number(value.replace(/[^0-9.-]+/g, ''));
	return number;
}
