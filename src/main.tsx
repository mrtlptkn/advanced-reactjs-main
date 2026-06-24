import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import mainRoutes from './routes/main.routes.tsx';
import CartProvider from './context/cart/cart.provider.tsx';
import AuthProvider from './context/auth/auth.provider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import '@fontsource/roboto/400.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme.ts';
import PostCardExample from './pages/index/atomic-design.page.tsx';

const router = createBrowserRouter([mainRoutes]);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AuthProvider>
			<CartProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<RouterProvider router={router} />

					{/* sayfa olarak sayfa içlerinde componentlerde dahil olmak üzere, bütün pagler ve diğer alt componentler hepsi cartprovider üzerindeki state alabilirler */}
					<PostCardExample />
				</ThemeProvider>
			</CartProvider>
		</AuthProvider>
	</Provider>
);
