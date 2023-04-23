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
		MuiPaper: {
			defaultProps: {
				elevation: 3,
				sx: {
					padding: '1rem',
					margin: '1rem',
				},
			},
		},
		MuiGrid: {
			// grid container default props
			defaultProps: {
				spacing: 2,
				sx: {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				},
			},
		},
		MuiLink: {
			defaultProps: {
				underline: 'hover',
				sx: {
					cursor: 'pointer',
				},
			},
		},
	},
});

export default responsiveFontSizes(theme);
