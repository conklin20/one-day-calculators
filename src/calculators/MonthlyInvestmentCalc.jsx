import {
	Box,
	Button,
	ButtonGroup,
	FormControlLabel,
	Grid,
	Paper,
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
		<Paper
			elevation={3}
			sx={{
				height: '100%',
				width: '100%',
				padding: '1rem',
			}}
		>
			<Grid
				container
				spacing={2}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Grid item xs={12}>
					<Typography variant='h6' gutterBottom>
						Monthly Investment Calculator
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Tooltip title={`What's amount do you need to live your dream?`}>
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
							<ButtonGroup
								sx={{
									justifyContent: 'space-between',
									marginBottom: '1rem',
								}}
								value={inputs.initialInvestment}
							>
								<Button
									variant={inputs.initialInvestment ? 'contained' : 'outlined'}
									onClick={() =>
										setInputs({ ...inputs, initialInvestment: true })
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
						<Tooltip title={`How much money do you have to initial invest?`}>
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
					<Tooltip title={`How many years do you have to invest?`}>
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
				<Grid item xs={12}>
					<Typography variant='h6' gutterBottom>
						{monthlyContriutionNeeded && (
							<Box display='flex'>
								You need to contribute{' '}
								<Box color='success.dark' fontWeight={'bold'} pl='4px'>
									{toCurrencyString(monthlyContriutionNeeded)}
								</Box>
								{'  '}
								/mo
							</Box>
						)}
					</Typography>
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

export default MonthlyInvestmentCalc;
