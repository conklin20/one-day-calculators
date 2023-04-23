import {
	Box,
	Button,
	ButtonGroup,
	Grid,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import { handleCurrencyChange, toCurrencyString } from '../utils/currencyUtils';
import { generateFeeMap, getMinAmount } from '../utils/feeUtils';
import Footer from '../shared/Footer';

const EstimatedFeeCalc = () => {
	const [assetLevel, setAssetLevel] = React.useState(10000000); // 10M
	const [estimatedAnnualFee, setEstimatedAnnualFee] = React.useState(null);
	const [estimatedFeeMap, setEstimatedFeeMap] = React.useState([]);
	const [insufficientAssetLevel, setInsufficientAssetLevel] = React.useState(false);
	const [viewAnnual, setViewAnnual] = React.useState(true);
	const [showBreakdown, setShowBreakdown] = React.useState(false);

	// handle calculation when assetLevel change
	React.useEffect(() => {
		if (assetLevel < getMinAmount()) {
			setInsufficientAssetLevel(true);
			return;
		}
		const feeMap = generateFeeMap(assetLevel);
		setEstimatedFeeMap(feeMap);
		const fee = feeMap.reduce((acc, cur) => acc + cur.fee, 0);
		console.log(`fee: ${fee}`);
		setEstimatedAnnualFee(fee);
		setInsufficientAssetLevel(false);
	}, [assetLevel]);

	return (
		<Paper>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant='h6' gutterBottom>
						Estimated Fee Calculator
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Tooltip title={`Estimated total value of assets we'll be managing?`}>
						<TextField
							label='Total Assets'
							value={toCurrencyString(assetLevel)}
							onChange={e => setAssetLevel(handleCurrencyChange(e))}
						/>
					</Tooltip>
				</Grid>

				<Grid id='one-day-calc-result' item xs={12} textAlign='center'>
					<ButtonGroup variant='contained'>
						<Button
							variant={viewAnnual ? 'contained' : 'outlined'}
							onClick={() => setViewAnnual(true)}
							fullWidth
						>
							Yearly
						</Button>
						<Button
							variant={viewAnnual ? 'outlined' : 'contained'}
							onClick={() => setViewAnnual(false)}
							fullWidth
						>
							Monthly
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid id='one-day-calc-result' item xs={12} textAlign='center'>
					<Typography variant='subtitle1' gutterBottom>
						{insufficientAssetLevel ? (
							<Box color='red'>
								{`Insufficient asset level. Minimum asset level is ${toCurrencyString(
									getMinAmount()
								)}`}
							</Box>
						) : (
							estimatedAnnualFee && (
								<>
									{viewAnnual ? (
										<Typography variant='h6'>
											{`Estimated annual fee: ${toCurrencyString(
												estimatedAnnualFee
											)}`}
										</Typography>
									) : (
										<Typography variant='h6'>
											{`Estimated monthly fee: ${toCurrencyString(
												estimatedAnnualFee / 12
											)}`}
										</Typography>
									)}

									<Button
										variant='text'
										onClick={() => setShowBreakdown(!showBreakdown)}
									>
										View Breakdown of Fees
									</Button>
									{showBreakdown &&
										estimatedFeeMap
											.filter(fee => fee.fee > 0)
											.map((fee, index) => (
												<Typography variant='body1' key={index}>
													{`${fee.name} | ${toCurrencyString(
														fee.fee / (viewAnnual ? 1 : 12)
													)}`}
												</Typography>
											))}
								</>
							)
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

export default EstimatedFeeCalc;
