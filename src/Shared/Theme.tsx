import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#DE3163',
		},
		secondary: {
			main: '#005e70',
		},
	},
	typography: {
		fontFamily: 'JetBrains Mono',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        @font-face {
          font-family: 'JetBrains Mono';
        }
      `,
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0,
				variant: 'outlined',
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					'& .MuiTabs-indicator': {
						display: 'none',
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					color: 'white',
					borderBottom: '1px solid white',
					borderRadius: '.5rem .5rem 0 0',
					'&.Mui-selected': {
						color: 'white',
						borderTop: '1px solid white',
						borderLeft: '1px solid white',
						borderRight: '1px solid white',
						borderBottom: '1px solid transparent',
						borderRadius: '.5rem .5rem 0 0',
					},
					'&.Mui-focusVisible': {
						backgroundColor: 'white',
					},
				},
			},
		},
	},
});
