import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Sidebar from '../ui/organisms/Sidebar/Sidebar';
import TopBar from '../ui/organisms/TopBar';

const MainLayout = () => {
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollButton(window.scrollY > 100);
		};

		// evenlistener tanımlarını useEffect içinde yapıyoruz

		window.addEventListener('scroll', handleScroll);

		// component domdan ayrılırsa yani başka bir layouta geçerse eventlistener kaldırılır
		// cleanup function
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

			<Box
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					minWidth: 0,
				}}
			>
				<TopBar onMenuClick={() => setMobileOpen(true)} />

				<main className="flex-1 bg-gray-50">
					<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
						{
							/* Alt sayfalar burada render edilecek */
							<Outlet />
						}
					</div>
				</main>

				<footer className="w-full flex justify-center py-4 text-sm text-gray-500 border-t bg-white">
					React Lab — React pattern playground
				</footer>
			</Box>

			{showScrollButton && (
				<Fab
					color="primary"
					onClick={scrollToTop}
					sx={{
						position: 'fixed',
						bottom: 30,
						right: 30,
					}}
				>
					<KeyboardArrowUpIcon />
				</Fab>
			)}
		</Box>
	);
};

export default MainLayout;
