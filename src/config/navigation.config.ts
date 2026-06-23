import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Sidebar ve dashboard home page'in tek doğruluk kaynağı (single source of truth).
// Her modül grubu bir React konusunu temsil eder, her item ise o konunun bir
// varyasyonunu (v1/v2 gibi) ve hangi teknikle yazıldığını (technique) gösterir.

export interface NavItem {
	label: string;
	path: string;
	technique: string;
}

export interface NavGroup {
	id: string;
	label: string;
	description: string;
	icon: ComponentType<SvgIconProps>;
	items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
	{
		id: 'atomic-design',
		label: 'Atomic Design',
		description: 'Atoms, molecules, organisms ve template katmanlarıyla bileşen mimarisi.',
		icon: ViewInArOutlinedIcon,
		items: [
			{ label: 'Atomic Design', path: '/atomic-design', technique: 'Atomic Design' },
		],
	},
	{
		id: 'hooks',
		label: 'React Hooks',
		description: 'useState, useRef ve useImperativeHandle örnekleri.',
		icon: ScienceOutlinedIcon,
		items: [
			{
				label: 'React Hooks',
				path: '/hooks',
				technique: 'useState / useRef / useImperativeHandle',
			},
		],
	},
	{
		id: 'posts',
		label: 'Posts',
		description: 'Aynı listenin manuel fetch ve RTK Query ile iki farklı yazımı.',
		icon: ArticleOutlinedIcon,
		items: [
			{ label: 'Posts (v1)', path: '/posts/home', technique: 'useState + useEffect' },
			{ label: 'Posts (v2)', path: '/posts/v2', technique: 'RTK Query' },
		],
	},
	{
		id: 'products',
		label: 'Products',
		description: 'Ürün listeleme; Redux Thunk ve RTK Query karşılaştırması.',
		icon: Inventory2OutlinedIcon,
		items: [
			{
				label: 'Products (v1)',
				path: '/products',
				technique: 'Redux Toolkit Thunk + Context API',
			},
			{ label: 'Products (v2)', path: '/products-v2', technique: 'RTK Query' },
		],
	},
	{
		id: 'cart',
		label: 'Cart',
		description: 'Aynı sepetin Context API ve Redux Toolkit ile iki ayrı yönetimi.',
		icon: ShoppingCartOutlinedIcon,
		items: [
			{ label: 'Cart (Context API)', path: '/cart-summary', technique: 'Context API' },
			{ label: 'Cart (Redux Toolkit)', path: '/cart-summary-v2', technique: 'Redux Toolkit' },
		],
	},
	{
		id: 'auth',
		label: 'Auth',
		description: 'Mock giriş akışı ve Route Guard (Protected Route) örneği.',
		icon: LockOutlinedIcon,
		items: [{ label: 'Login', path: '/login', technique: 'Mock Auth / Context API' }],
	},
];
