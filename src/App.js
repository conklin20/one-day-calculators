import './App.css';
// create mui theme
import { ThemeProvider } from '@mui/material/styles';
import theme from './muiTheme';
import MonthlyInvestmentCalc from './calculators/MonthlyInvestmentCalc';
import EstimatedFeeCalc from './calculators/EstimatedFeeCalc';

const Calculators = ({ calculator }) => {
	switch (calculator) {
		case 'monthly-investment':
			return <MonthlyInvestmentCalc />;
		case 'fee-estimate':
			return <EstimatedFeeCalc />;
		default:
			return <div>Calculator not found</div>;
	}
};

const App = ({ domElement }) => {
	const calculator = domElement.getAttribute('data-calc-name');
	return (
		<ThemeProvider theme={theme}>
			<Calculators calculator={calculator} />
		</ThemeProvider>
	);
};

export default App;
