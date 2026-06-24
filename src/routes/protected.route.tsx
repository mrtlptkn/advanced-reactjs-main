import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { AuthContext, type AuthContextType } from '../context/auth/auth.context';

// Route Guard: bu component bir layout route olarak kullanılır.
// Kullanıcı giriş yapmamışsa /login'e yönlendirilir, gideceği sayfa state.from olarak taşınır.
// Giriş yapılınca LoginPage bu bilgiyi okuyup kullanıcıyı tekrar buraya gönderir (useLocation + useNavigate).
function ProtectedRoute({children}: {children?: React.ReactNode}) {
	const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
	const location = useLocation();

	console.log('ProtectedRoute: isAuthenticated', isAuthenticated);

	// eğer oturum açılmamış client state oluşmamış ise bizi login sayfasına yönlendirir. login sayfası state.from ile geldiğimiz sayfayı alır ve login başarılı olursa bizi tekrar buraya yönlendirir.
	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	// eğer login olduysak ilgili sayfayı açar. children varsa children render edilir, yoksa Outlet render edilir.
	return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
