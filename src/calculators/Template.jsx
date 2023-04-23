import {
	Box,
	Button,
	ButtonGroup,
	FormControlLabel,
	Grid,
	Link,
	Paper,
	Slider,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import { handleCurrencyChange, toCurrencyString } from '../utils/currencyUtils';
import { handleRateChange, handleYearsChange } from '../utils/numberUtils';
import Finance from 'tvm-financejs';

const calculator = new Finance();

const MonthlyInvestmentCalc = () => {
	const [inputs, setInputs] = React.useState({
		initialInvestment: true,
		initialInvestmentAmount: 10000,
		targetBalance: 2000000,
		years: 10,
		rate: 0.2,
	});
	const [monthlyContriutionNeeded, setMonthlyContriutionNeeded] = React.useState(null);

	// handle calculation when inputs change
	React.useEffect(() => {
		const { initialInvestment, initialInvestmentAmount, targetBalance, years, rate } = inputs;
		let monthlyContriutionNeeded = 0;
		if (!initialInvestment) {
			monthlyContriutionNeeded = calculator.PMT(rate / 12, years * 12, 0, targetBalance) * -1;
		} else {
			const fvOfInitialInvestment = calculator.FV(
				rate / 12,
				years * 12,
				0,
				initialInvestmentAmount,
				0
			);
			monthlyContriutionNeeded =
				calculator.PMT(rate / 12, years * 12, 0, targetBalance + fvOfInitialInvestment) *
				-1;
		}
		setMonthlyContriutionNeeded(monthlyContriutionNeeded);
	}, [inputs]);

	return (
		<Paper>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant='h6' gutterBottom>
						Calculator Name
					</Typography>
				</Grid>

				<Grid id='one-day-calc-result' item xs={12} textAlign='center'>
					<Typography variant='subtitle1' gutterBottom></Typography>
				</Grid>

				<Grid item xs={12}>
					<img
						src='https://uploads-ssl.webflow.com/608246c974cb770b2a8c4bdd/6084670e9d95cb6043091974_oneday_logomiddle_transparent-p-500.png'
						alt='one day logo'
						width='100px'
						onClick={() => window.open('https://www.onedayadvice.com/')}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Template;
