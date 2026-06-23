import { useRouteError } from 'react-router';

// loader action üzerinde hata oluştuğunda bu component render edilir. Veri yükleme sırasında oluşan hataları yakalamak için kullanılır.
// Tüm sayfalardaki yükelme hataları için merkezi bir yer yaptık.
function ErrorBoundary() {
	const routeError = useRouteError();
	console.error('Route Error:', routeError);

	return (
		<div className="text-red-500">
			Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.
		</div>
	);
}

export default ErrorBoundary;
