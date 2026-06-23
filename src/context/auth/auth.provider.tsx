import { useState } from 'react';
import { AuthContext } from './auth.context';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	// mock auth: gerçek bir backend/token doğrulaması yok, sadece username set edilmiş mi diye bakıyoruz
	const [username, setUsername] = useState<string | null>(null);

	const login = (name: string) => setUsername(name);
	const logout = () => setUsername(null);

	const values = {
		isAuthenticated: username !== null,
		username,
		login,
		logout,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
