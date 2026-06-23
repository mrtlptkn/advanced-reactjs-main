import { useContext } from 'react';
import { Link as RouterLink } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import {
	AuthContext,
	type AuthContextType,
} from '../../context/auth/auth.context';

interface TopBarProps {
	onMenuClick: () => void;
}

// Üst bar artık tüm navigasyonu taşımıyor: sadece mobilde sidebar'ı açan hamburger
// butonu ve giriş/çıkış durumunu gösteriyor. Modül navigasyonu Sidebar'a taşındı.
function TopBar({ onMenuClick }: TopBarProps) {
	const { isAuthenticated, username, logout } = useContext(
		AuthContext,
	) as AuthContextType;

	return (
		<AppBar position="sticky" color="default" sx={{ bgcolor: 'white' }}>
			<Toolbar sx={{ gap: 1 }}>
				<IconButton
					onClick={onMenuClick}
					sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
					aria-label="Menüyü aç"
				>
					<MenuIcon />
				</IconButton>

				<MuiTypography
					component={RouterLink}
					to="/"
					variant="subtitle1"
					sx={{
						fontWeight: 700,
						color: 'primary.main',
						textDecoration: 'none',
						display: { xs: 'block', sm: 'none' },
					}}
				>
					React Lab
				</MuiTypography>

				<Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
					{isAuthenticated ? (
						<>
							<MuiTypography variant="body2" color="text.secondary">
								{username}
							</MuiTypography>
							<Button color="primary" onClick={logout}>
								Çıkış Yap
							</Button>
						</>
					) : (
						<Button
							component={RouterLink}
							to="/login"
							color="primary"
							variant="outlined"
						>
							Giriş Yap
						</Button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default TopBar;
