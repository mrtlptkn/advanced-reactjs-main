import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { AuthContext, type AuthContextType } from '../context/auth/auth.context';

// Route Guard: bu component bir layout route olarak kullanılır.
// Kullanıcı giriş yapmamışsa /login'e yönlendirilir, gideceği sayfa state.from olarak taşınır.
// Giriş yapılınca LoginPage bu bilgiyi okuyup kullanıcıyı tekrar buraya gönderir (useLocation + useNavigate).
function ProtectedRoute() {
	const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return <Outlet />;
}

export default ProtectedRoute;
