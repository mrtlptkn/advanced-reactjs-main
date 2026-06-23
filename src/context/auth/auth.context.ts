import { createContext } from 'react';

// Route Guard (Protected Route) için kullanılan basit mock auth context.
// Gerçek bir kimlik doğrulama yapmaz, sadece "giriş yapılmış mı?" durumunu client state olarak tutar.

export interface AuthContextType {
	isAuthenticated: boolean;
	username: string | null;
	login: (username: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
