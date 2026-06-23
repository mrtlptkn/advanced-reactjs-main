import { NavLink, Outlet } from 'react-router';

// Nasayafadan post sayfalarına geçiş için bir layout örneği
// Post sayfaları için ortak başlık ve navigasyon içerir
// Navlink hangi statede kaldığımızı bilir ve ona göre stil uygular

function PostLayout() {
	const tabClassName = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold transition'
			: 'px-4 py-1.5 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition';

	return (
		<div>
			<nav className="mb-6 inline-flex gap-1 p-1 bg-gray-100 rounded-full">
				<NavLink className={tabClassName} to="/posts/home">
					Posts (v1)
				</NavLink>
				<NavLink className={tabClassName} to="/posts/v2">
					Posts (v2)
				</NavLink>
			</nav>
			<main>
				{/* Post content will go here */}
				<Outlet />
			</main>
		</div>
	);
}

export default PostLayout;
