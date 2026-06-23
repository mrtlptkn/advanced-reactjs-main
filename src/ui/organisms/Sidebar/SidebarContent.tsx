import { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { navigationConfig } from '../../../config/navigation.config';

interface SidebarContentProps {
	onNavigate?: () => void;
}

const isPathActive = (pathname: string, target: string) =>
	pathname === target || pathname.startsWith(`${target}/`);

// Sidebar'ın hem masaüstü (permanent) hem mobil (temporary) Drawer'ı içinde
// kullanılan ortak liste içeriği. Modül grupları navigation.config.ts'den okunur.
function SidebarContent({ onNavigate }: SidebarContentProps) {
	const location = useLocation();

	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
		navigationConfig.reduce(
			(acc, group) => ({ ...acc, [group.id]: true }),
			{} as Record<string, boolean>,
		),
	);

	const toggleGroup = (id: string) =>
		setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

	return (
		<Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
			<Box sx={{ px: 2, py: 2.5 }}>
				<MuiTypography
					variant="subtitle1"
					sx={{ fontWeight: 700, color: 'primary.main' }}
				>
					React Lab
				</MuiTypography>
				<MuiTypography variant="caption" color="text.secondary">
					Modül modül React pattern rehberi
				</MuiTypography>
			</Box>
			<Divider />

			<List
				component="nav"
				sx={{ px: 1 }}
				subheader={
					<ListItemButton
						component={RouterLink}
						to="/"
						onClick={onNavigate}
						selected={location.pathname === '/'}
						sx={{ borderRadius: 1.5, mb: 1 }}
					>
						<ListItemIcon sx={{ minWidth: 36 }}>
							<HomeOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				}
			>
				{navigationConfig.map((group) => {
					const GroupIcon = group.icon;

					if (group.items.length === 1) {
						const item = group.items[0];
						const active = isPathActive(location.pathname, item.path);
						return (
							<ListItemButton
								key={group.id}
								component={RouterLink}
								to={item.path}
								onClick={onNavigate}
								selected={active}
								sx={{ borderRadius: 1.5, mb: 0.5 }}
							>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<GroupIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={group.label} />
							</ListItemButton>
						);
					}

					const groupActive = group.items.some((item) =>
						isPathActive(location.pathname, item.path),
					);
					const isOpen = openGroups[group.id];

					return (
						<Box key={group.id} sx={{ mb: 0.5 }}>
							<ListItemButton
								onClick={() => toggleGroup(group.id)}
								selected={groupActive && !isOpen}
								sx={{ borderRadius: 1.5 }}
							>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<GroupIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={group.label} />
								{isOpen ? (
									<ExpandLessIcon fontSize="small" />
								) : (
									<ExpandMoreIcon fontSize="small" />
								)}
							</ListItemButton>
							<Collapse in={isOpen} timeout="auto" unmountOnExit>
								<List component="div" disablePadding sx={{ pl: 2.5 }}>
									{group.items.map((item) => {
										const active = isPathActive(location.pathname, item.path);
										return (
											<ListItemButton
												key={item.path}
												component={RouterLink}
												to={item.path}
												onClick={onNavigate}
												selected={active}
												sx={{ borderRadius: 1.5, mb: 0.5, py: 0.75 }}
											>
												<ListItemText
													primary={item.label}
													secondary={
														<Chip
															label={item.technique}
															size="small"
															variant="outlined"
															sx={{ mt: 0.5, height: 20, fontSize: '0.65rem' }}
														/>
													}
													slotProps={{ secondary: { component: 'div' } }}
												/>
											</ListItemButton>
										);
									})}
								</List>
							</Collapse>
						</Box>
					);
				})}
			</List>
		</Box>
	);
}

export default SidebarContent;
