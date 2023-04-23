import {
	Box,
	Button,
	ButtonGroup,
	FormControlLabel,
	Grid,
	Link,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import { handleCurrencyChange, toCurrencyString } from '../utils/currencyUtils';
import { handleRateChange, handleYearsChange } from '../utils/numberUtils';
import Finance from 'tvm-financejs';
import Footer from '../shared/Footer';

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
						Monthly Investment Calculator
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Tooltip title={`What amount do you need to live your dream?`}>
						<TextField
							label='Target Balance'
							value={toCurrencyString(inputs.targetBalance)}
							onChange={e =>
								setInputs({
									...inputs,
									targetBalance: handleCurrencyChange(e),
								})
							}
						/>
					</Tooltip>
				</Grid>

				<Grid item xs={12}>
					<FormControlLabel
						control={
							<ButtonGroup value={inputs.initialInvestment}>
								<Button
									variant={inputs.initialInvestment ? 'contained' : 'outlined'}
									onClick={() =>
										setInputs({
											...inputs,
											initialInvestment: true,
											initialInvestmentAmount: 10000,
										})
									}
								>
									Yes
								</Button>
								<Button
									variant={inputs.initialInvestment ? 'outlined' : 'contained'}
									onClick={() =>
										setInputs({
											...inputs,
											initialInvestment: false,
											initialInvestmentAmount: 0,
										})
									}
								>
									No
								</Button>
							</ButtonGroup>
						}
						label='Are you able to make an initial investment?'
						labelPlacement='top'
					/>
				</Grid>
				{inputs.initialInvestment && (
					<Grid item xs={12}>
						<Tooltip title={`How much money could you feasibly invest up front?`}>
							<TextField
								label='Initial Investment'
								value={toCurrencyString(inputs.initialInvestmentAmount)}
								onChange={e =>
									setInputs({
										...inputs,
										initialInvestmentAmount: handleCurrencyChange(e),
									})
								}
							/>
						</Tooltip>
					</Grid>
				)}
				<Grid item xs={12}>
					<Tooltip title={`How many years until you'd ideally reach your goal?`}>
						<TextField
							label='Years'
							value={inputs.years}
							type='number'
							onChange={e =>
								setInputs({
									...inputs,
									years: handleYearsChange(e),
								})
							}
						/>
					</Tooltip>
				</Grid>
				<Grid item xs={12}>
					<Tooltip title={`What's the expected rate of return?`}>
						<TextField
							label='Rate'
							value={inputs.rate}
							type='number'
							onChange={e =>
								setInputs({
									...inputs,
									rate: handleRateChange(e),
								})
							}
						/>
					</Tooltip>
				</Grid>
				{/* <Grid item xs={12}>
					<Tooltip title={`What is your risk tolerance?`}>
						<Slider
							value={inputs.rate}
							onChange={e => setInputs({ ...inputs, rate: handleRateChange(e) })}
							min={0}
							max={1}
							step={0.01}
							size='small'
							valueLabelDisplay='off'
						/>
					</Tooltip>
				</Grid> */}
				<Grid id='one-day-calc-result' item xs={12} textAlign='center'>
					<Typography variant='subtitle1' gutterBottom>
						{monthlyContriutionNeeded && (
							<Box>
								{`You'd need to contribute`}
								<Box
									component='span'
									color='success.dark'
									fontWeight={'bold'}
									pl='4px'
								>
									{toCurrencyString(monthlyContriutionNeeded)}
								</Box>
								{`/mo to reach your goal. Contact `}
								<Link component='span' href='https://www.onedayadvice.com/'>
									{' '}
									One Day Advice{' '}
								</Link>
								{` today to start planning!`}
							</Box>
						)}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Footer />
				</Grid>
			</Grid>
		</Paper>
	);
};

export default MonthlyInvestmentCalc;
