import { useNavigate, useParams } from 'react-router';
import { useGetPostByIdQuery } from '../../../api/postApi/post.api';
import { Card, CardContent } from '../../../ui/molecules';
import { ModuleShell } from '../../../ui/templates';

// useParams: URL'deki dinamik route parametresini okur. Örn: /posts/v2/3 -> postId = "3"
// Route tanımı main.routes.ts içinde "v2/:postId" şeklindedir.
function PostDetailPage() {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();

	const {
		data: post,
		isLoading,
		error,
	} = useGetPostByIdQuery(Number(postId));

	const backAction = (
		<button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline">
			← Geri
		</button>
	);

	if (isLoading) {
		return (
			<ModuleShell title="Post Detail" techniques={['useParams', 'RTK Query']} actions={backAction}>
				<p className="text-center text-gray-500">Yükleniyor...</p>
			</ModuleShell>
		);
	}

	if (error || !post) {
		return (
			<ModuleShell title="Post Detail" techniques={['useParams', 'RTK Query']} actions={backAction}>
				<p className="text-center text-red-500">Post bulunamadı.</p>
			</ModuleShell>
		);
	}

	return (
		<ModuleShell
			title="Post Detail"
			description="Dinamik route parametresi (/posts/v2/:postId) useParams ile okunur."
			techniques={['useParams', 'RTK Query']}
			actions={backAction}
		>
			<Card>
				<CardContent>
					<h1 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h1>
					<p className="text-gray-700">{post.body}</p>
				</CardContent>
			</Card>
		</ModuleShell>
	);
}

export default PostDetailPage;
