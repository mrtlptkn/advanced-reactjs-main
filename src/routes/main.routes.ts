import React from 'react';
import type { RouteObject } from 'react-router';
import { getPostAsync } from '../client/post.client';

// Nested Route ve Nested Layout Örneği
// Ana layout altında farklı sayfalar ve alt layoutlar tanımlanabilir

const mainRoutes: RouteObject = {
	path: '',
	Component: React.lazy(() => import('../layout/main.layout')),
	children: [
		{
			index: true,
			Component: React.lazy(() => import('../pages/index/home.page')),
		},
		{
			path: 'hooks',
			Component: React.lazy(() => import('../pages/index/react.hooks.page')),
		},
		{
			path: 'atomic-design',
			Component: React.lazy(() => import('../pages/index/atomic-design.page')),
		},
		{
			path: 'posts',
			Component: React.lazy(() => import('../layout/post.layout')),
			children: [
				{
					path: 'home',
					Component: React.lazy(() => import('../pages/post/pages/index.page')),
				},
				{
					path: 'v2',
					Component: React.lazy(
						() => import('../pages/post/pages/index-v2.page')
					),
					loader: async ({ request }) => {
						// Veri yükleme işlemleri burada yapılabilir
						// Örneğin, API çağrıları veya veri ön işleme
						// preload edilmiş verilerle component render edilir
						// throw new Error('Hata');

						// request.signal -> kullanıcı bu route'tan ayrılmadan (örn. hızlıca başka sayfaya geçerse)
						// React Router bu signal'i otomatik abort eder, biz de isteği boşa harcamamak için iletiyoruz.
						const data = await getPostAsync(request.signal);
						console.log('Loader Data:', data);

						// getPostAsync()
						// 	.then((data) => {
						// 		console.log('Fetched posts in loader:', data);
						// 		return data;
						// 	})
						// 	.catch((error) => {
						// 		console.error('Error fetching posts in loader:', error);
						// 	});

						return data;
					},
					hasErrorBoundary: true,
					ErrorBoundary: React.lazy(() => import('../pages/error')),
				},
				{
					// useParams ile dinamik route parametresi örneği: /posts/v2/123
					path: 'v2/:postId',
					Component: React.lazy(
						() => import('../pages/post/pages/post-detail.page')
					),
				},
			],
		},
		{
			path: 'products',
			Component: React.lazy(() => import('../pages/product/products.page')),
		},
		{
			path: 'products-v2',
			Component: React.lazy(() => import('../pages/product/products.pagev2')),
		},
		{
			path: 'login',
			Component: React.lazy(() => import('../pages/auth/login.page')),
		},
		{
			// Route Guard örneği: bu layout route altındaki sayfalar sadece giriş yapmış kullanıcılar için açılır.
			// Giriş yapılmamışsa ProtectedRoute, kullanıcıyı /login'e yönlendirir.
			Component: React.lazy(() => import('./protected.route')),
			children: [
				{
					path: 'cart-summary',
					Component: React.lazy(
						() => import('../pages/cart/cart.summary.page')
					),
				},
				{
					path: 'cart-summary-v2',
					Component: React.lazy(
						() => import('../pages/cart/cart.summary.v2.page')
					),
				},
			],
		},
	],
};

// loader, action, errorBoundary kullanımı Reactte Router v7 ile gelen yeni özelliklerdir

// React.lazy ile tembel yükleme kullanarak ana rota yapılandırması
// Ana layout ve alt sayfalar için bileşenler dinamik olarak yüklenir
// React Lazy bir peformans optimizasyonudur
// Her sayfanın kodunu code-split yaparak başlangıç yükleme süresini azaltır

// TS için modül dışa aktarma
// ES Module standardını kullanır
export default mainRoutes;
