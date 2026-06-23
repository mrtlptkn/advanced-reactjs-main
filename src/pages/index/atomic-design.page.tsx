import React from 'react';
import PostGrid from '../../ui/templates/PostGrid';
import PostSummary from '../../ui/templates/PostSummary';
import DataFetcher from '../../ui/templates/DataFetcher';
import type { Post } from '../../model/post';
import { Card, CardHeader, CardContent } from '../../ui/molecules';
import { ModuleShell } from '../../ui/templates';

export const PostCardExample: React.FC = () => {
	return (
		<ModuleShell
			title="Atomic Design"
			description="Atoms, molecules, organisms ve template katmanlarıyla oluşturulmuş bileşen mimarisi örnekleri."
			techniques={['Atomic Design']}
		>
			<Card>
				<CardHeader>
					<h2 className="text-lg font-semibold text-gray-900">
						Post Summary Template
					</h2>
					<p className="text-sm text-gray-500 mt-1">
						Atomic Design ile oluşturulmuş Post Summary Template örneği
					</p>
				</CardHeader>
				<CardContent>
					{/* Örnek 1: Temel Kullanım */}
					<PostSummary
						item={[
							{
								userInfo: { name: 'Ali', date: '19.12.2025', avatarUrl: 'A' },
								title: 'React ve TypeScript ile Modern Web Geliştirme',
								contentText:
									'React ve TypeScript kombinasyonu, modern web uygulamaları geliştirmek için güçlü bir temel sağlar. Type safety ve component-based mimari ile daha güvenli ve sürdürülebilir kodlar yazabilirsiniz.',
								link: 'detail',
							},
							{
								userInfo: { name: 'Ahmet', date: '19.12.2025', avatarUrl: 'A' },
								title: 'React ve TypeScript ile Modern Web Geliştirme',
								contentText:
									'React ve TypeScript kombinasyonu, modern web uygulamaları geliştirmek için güçlü bir temel sağlar. Type safety ve component-based mimari ile daha güvenli ve sürdürülebilir kodlar yazabilirsiniz.',
								link: 'iletişime geçin',
							},
						]}
					>
						<PostGrid />
					</PostSummary>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<h2 className="text-lg font-semibold text-gray-900">
						Render Prop Pattern Örneği
					</h2>
					<p className="text-sm text-gray-500 mt-1">
						DataFetcher component'i veri çekme mantığını kendi içinde tutar,
						children fonksiyonu (render prop) ile sonucu ekrana nasıl
						basacağımıza biz karar veririz.
					</p>
				</CardHeader>
				<CardContent>
					<DataFetcher<Post[]> url="https://jsonplaceholder.typicode.com/posts?_limit=3">
						{({ data, loading, error }) => {
							if (loading) return <p>Yükleniyor...</p>;
							if (error) return <p className="text-red-500">{error}</p>;
							return (
								<ul className="list-disc pl-5 space-y-1">
									{data?.map((post) => <li key={post.id}>{post.title}</li>)}
								</ul>
							);
						}}
					</DataFetcher>
				</CardContent>
			</Card>
		</ModuleShell>
	);
};

export default PostCardExample;
