import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { spacing } from '@mui/system';

/** Theme styles
 * responsive text sizes
 * primary color is #4893ff
 * default TextField size to 'small'
 *
 *  */

const theme = createTheme({
	palette: {
		primary: {
			main: '#4893ff',
		},
	},
	components: {
		MuiTextField: {
			defaultProps: {
				size: 'small',
				variant: 'outlined',
			},
		},
	},
});

export default responsiveFontSizes(theme);
