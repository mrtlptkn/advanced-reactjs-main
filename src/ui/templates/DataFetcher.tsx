import { useEffect, useState } from 'react';

interface DataFetcherState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

interface DataFetcherProps<T> {
	url: string;
	children: (state: DataFetcherState<T>) => React.ReactNode;
}

// Render Prop Pattern: bu component veri çekme mantığını (fetch, loading, error state) kendi içinde yönetir.
// Ekrana ne basılacağına karar vermeyi ise children prop'una (bir fonksiyon) bırakır.
// Böylece aynı veri çekme mantığı, farklı görünümlerle (liste, kart, tablo vb.) tekrar tekrar kullanılabilir.
function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
	const [state, setState] = useState<DataFetcherState<T>>({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		const controller = new AbortController();

		fetch(url, { signal: controller.signal })
			.then((response) => response.json())
			.then((data: T) => setState({ data, loading: false, error: null }))
			.catch((error) => {
				if (error instanceof DOMException && error.name === 'AbortError') return;
				setState({ data: null, loading: false, error: 'Veri yüklenemedi.' });
			});

		// component unmount olursa veya url değişirse bekleyen isteği iptal ediyoruz
		return () => controller.abort();
	}, [url]);

	return <>{children(state)}</>;
}

export default DataFetcher;
