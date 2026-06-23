import Drawer from '@mui/material/Drawer';
import SidebarContent from './SidebarContent';

export const SIDEBAR_WIDTH = 260;

interface SidebarProps {
	mobileOpen: boolean;
	onClose: () => void;
}

// Responsive sidebar: masaüstünde her zaman görünen permanent Drawer, mobilde
// hamburger ile açılıp kapanan temporary (overlay) Drawer. İçerik SidebarContent'te paylaşılır.
function Sidebar({ mobileOpen, onClose }: SidebarProps) {
	return (
		<>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					width: SIDEBAR_WIDTH,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: SIDEBAR_WIDTH,
						boxSizing: 'border-box',
						borderRight: '1px solid',
						borderColor: 'divider',
					},
				}}
			>
				<SidebarContent />
			</Drawer>

			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={onClose}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
				}}
			>
				<SidebarContent onNavigate={onClose} />
			</Drawer>
		</>
	);
}

export default Sidebar;
