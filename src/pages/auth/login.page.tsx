import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext, type AuthContextType } from '../../context/auth/auth.context';

interface LocationState {
	from?: { pathname: string };
}

function LoginPage() {
	const [username, setUsername] = useState('');
	const { login } = useContext(AuthContext) as AuthContextType;
	const navigate = useNavigate();
	const location = useLocation();

	// ProtectedRoute, kullanıcıyı buraya yönlendirirken gitmek istediği sayfayı location.state.from olarak iletmişti.
	// Giriş başarılı olunca kullanıcıyı tekrar oraya gönderiyoruz.
	const from = (location.state as LocationState | null)?.from?.pathname ?? '/';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!username.trim()) return;

		login(username.trim());
		navigate(from, { replace: true });
	};

	return (
		<div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
			<h1 className="text-xl font-bold mb-2">Giriş Yap</h1>
			<p className="text-sm text-gray-600 mb-4">
				Bu basit bir mock auth örneğidir, herhangi bir kullanıcı adıyla giriş
				yapabilirsiniz.
			</p>

			<form onSubmit={handleSubmit} className="space-y-3">
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Kullanıcı adı"
					className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-3 py-2 transition"
				>
					Giriş Yap
				</button>
			</form>
		</div>
	);
}

export default LoginPage;
