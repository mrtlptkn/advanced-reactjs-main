import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	Typography,
} from '../../ui';
import { navigationConfig } from '../../config/navigation.config';

// Route bazlı lazy loading'den (main.routes.ts) farklı olarak, burada component sayfa açılırken değil,
// kullanıcı butona tıklayıp showStats true olunca indirilir. Network tab'den ayrı bir chunk olarak görülebilir.
const StatsPanel = lazy(() => import('../../ui/organisms/StatsPanel'));

const HomePage = () => {
	const [showStats, setShowStats] = useState(false);

	return (
		<div>
			<div className="mb-8">
				<Typography renderAs="h1" className="text-3xl font-bold text-gray-900">
					React Lab
				</Typography>
				<Typography className="text-gray-600 mt-2 max-w-2xl">
					Her kart farklı bir React tekniğini gösteren bağımsız bir modüldür:
					Atomic Design, hooks, Context API, Redux Toolkit, RTK Query ve React
					Router v7 örnekleri bir arada. Bir modüle girmek için kartlardan
					birini seç, ya da sol menüyü kullan.
				</Typography>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{navigationConfig.map((group) => {
					const GroupIcon = group.icon;
					return (
						<Card key={group.id} className="flex flex-col">
							<CardHeader className="flex items-start gap-3">
								<span className="text-blue-600 mt-0.5">
									<GroupIcon fontSize="medium" />
								</span>
								<Typography
									renderAs="h2"
									className="text-lg font-semibold text-gray-900"
								>
									{group.label}
								</Typography>
							</CardHeader>
							<CardContent className="flex-1">
								<Typography className="text-sm text-gray-600">
									{group.description}
								</Typography>
							</CardContent>
							<CardFooter className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<Link
										key={item.path}
										to={item.path}
										className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
									>
										{item.label} →
									</Link>
								))}
							</CardFooter>
						</Card>
					);
				})}
			</div>

			<div className="mt-10 pt-6 border-t border-gray-200">
				<Typography
					renderAs="h2"
					className="text-lg font-semibold text-gray-900 mb-1"
				>
					Code-Splitting Demo
				</Typography>
				<Typography className="text-sm text-gray-600 mb-3">
					Bu panel route bazlı değil, butona tıklanana kadar hiç indirilmeyen
					(React.lazy + Suspense) ayrı bir chunk'tır.
				</Typography>

				<button
					onClick={() => setShowStats((prev) => !prev)}
					className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
				>
					{showStats ? 'İstatistikleri Gizle' : 'İstatistikleri Göster'}
				</button>

				{showStats && (
					<div className="mt-4 max-w-sm">
						<Suspense fallback={<p>Panel yükleniyor...</p>}>
							<StatsPanel />
						</Suspense>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
