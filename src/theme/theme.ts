import { createTheme } from '@mui/material/styles';

// Tailwind blue-600 / SCSS $primary-color ile aynı renk -> MUI ve Tailwind bileşenleri
// aynı marka rengini paylaşsın diye burada tekrar tanımlandı.
const theme = createTheme({
	palette: {
		primary: {
			main: '#2563eb',
			light: '#3b82f6',
			dark: '#1d4ed8',
		},
	},
	shape: {
		// Tailwind'in rounded-lg değeriyle (0.5rem) eşleşir.
		borderRadius: 8,
	},
	typography: {
		fontFamily: ['Roboto', 'system-ui', 'sans-serif'].join(','),
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		},
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
			},
		},
	},
});

export default theme;
