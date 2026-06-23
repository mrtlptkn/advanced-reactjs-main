import { useEffect, useState } from 'react';
import { getPosts } from '../../../client/post.client';
import type { Post } from '../../../model/post';
import { Card, CardContent } from '../../../ui/molecules';
import { ModuleShell } from '../../../ui/templates';

// Not: Bu componentteki veriler örnek amaçlıdır ve gerçek bir API çağrısı yapmaz.
// component ayrımları göz ardı edilmiştir.

function PostIndexPage() {
	// load edilen verilen asenkron olduğundan dolayı useEffect içinde çağrılması gerekir. ve asenkron bir yapıda sayfayı aseknron duruma göre düzenlememiz gerekir.
	const [posts, setPosts] = useState<Post[]>([]); // apidan gelir, apidan load olma süresi var
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null); // hata alma ihtimalmiz söz konusu

	const loadData = () => {
		setTimeout(() => {
			getPosts()
				.then((data: Post[]) => {
					setLoading(false);
					setPosts(data);
					// throw Error('Simulated data loading error');
					console.log('Posts loaded successfully.');
				})
				.catch((error) => {
					setLoading(false);
					setError('Failed to load posts.');
					console.error('Error loading posts:', error);
				});
		}, 2000);
	};

	useEffect(() => {
		document.title = 'Post Index Page';
		loadData();
	}, []);

	if (loading) {
		return (
			<ModuleShell title="Posts (v1)" techniques={['useState', 'useEffect']}>
				<p className="text-center text-gray-500">Loading...</p>
			</ModuleShell>
		);
	}

	if (error) {
		return (
			<ModuleShell title="Posts (v1)" techniques={['useState', 'useEffect']}>
				<p className="text-center text-red-500">{error}</p>
			</ModuleShell>
		);
	}

	// posts yüklendiğinde gösterilecek içerik
	return (
		<ModuleShell
			title="Posts (v1)"
			description="useState + useEffect ile manuel veri çekme örneği."
			techniques={['useState', 'useEffect']}
		>
			{posts.map((post) => (
				<Card key={post.id}>
					<CardContent>
						<h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
						<p className="text-gray-600">{post.body}</p>
					</CardContent>
				</Card>
			))}
		</ModuleShell>
	);
}

export default PostIndexPage;
