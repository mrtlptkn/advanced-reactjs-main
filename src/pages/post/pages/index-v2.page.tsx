import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import PostForm from '../components/post.form';
import { useGetPostsQuery } from '../../../api/postApi/post.api';
import type { Post } from '../../../model/post';
import React from 'react';
import { Card, CardContent } from '../../../ui/molecules';
import { ModuleShell } from '../../../ui/templates';

//useCallback ile fonksiyonların referanslarını koruyoruz, böylece child componentlere props olarak geçerken
// gereksiz renderların önüne geçmiş oluyoruz. Componenti ise React memo ile sarmalayarak prop değişmediği sürece
// yeniden render edilmesini engelliyoruz.
const MemoizedPostForm = React.memo(PostForm);

function PostIndexv2Page() {
	// useLoaderData ile yüklenen verileri alıyoruz, component yüklenmeden veri hazır olur.
	// const data: Post[] = useLoaderData() as Post[];
	const { data, error, isLoading } = useGetPostsQuery();
	const [open, setOpen] = useState<boolean>(false);
	const [random, setRandom] = useState<number>(0); // random state değişince PostFrom bu componentin child componenti olduğu için yeniden render'a sebep olur.

	// Function memoization yapılmadığından dolayı her renderda handleClose fonksiyonu yeniden oluşturulur. Buda FormPost componetine props olarak geçince yeniden rendera sebep olur.
	const handleClose = useCallback(() => {
		setOpen(false);
	}, []); // component domdan çıkana kadar aynı fonksiyon referansını korur.

	const onFormSubmit = useCallback((data: Post) => {
		console.log('Form submitted data:', data);
		setOpen(false);
	}, []); // component domdan çıkana kadar aynı fonksiyon referansını korur.

	const headerActions = (
		<>
			<button
				className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
				onClick={() => setRandom(Math.floor(Math.random() * 100))}
			>
				Generate Random Number: {random}
			</button>
			<button
				className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition"
				onClick={() => setOpen(true)}
			>
				Add Post
			</button>
		</>
	);

	if (isLoading) {
		return (
			<ModuleShell title="Posts (v2)" techniques={['RTK Query']} actions={headerActions}>
				<p className="text-center text-gray-500">Loading...</p>
			</ModuleShell>
		);
	}

	if (error) {
		return (
			<ModuleShell title="Posts (v2)" techniques={['RTK Query']} actions={headerActions}>
				<p className="text-center text-red-500">Error loading posts.</p>
			</ModuleShell>
		);
	}

	// React virtualda props değişince render aldığında gereksiz render maliyei ortaya çıkıyor.
	// çözüm yöntemi böyle durumlarda useCallback ile function memoization yapabiliriz.

	// Post Formdan dönen function props direkt olarak kullanırsak yeniden render sebep olur.

	return (
		<ModuleShell
			title="Posts (v2)"
			description="RTK Query ile veri çekme; React.memo + useCallback ile gereksiz render'ların önlenmesi."
			techniques={['RTK Query', 'React.memo', 'useCallback']}
			actions={headerActions}
		>
			<MemoizedPostForm
				open={open}
				handleClose={handleClose}
				onFormSubmit={onFormSubmit}
			/>

			{data?.map((post) => (
				<Card key={post.id}>
					<CardContent>
						{/* useParams örneği için detay sayfasına yönlendirme */}
						<Link
							to={`/posts/v2/${post.id}`}
							className="text-lg font-semibold block text-blue-700 hover:underline mb-2"
						>
							{post.title}
						</Link>
						<p className="text-gray-600">{post.body}</p>
					</CardContent>
				</Card>
			))}
		</ModuleShell>
	);
}

export default PostIndexv2Page;
