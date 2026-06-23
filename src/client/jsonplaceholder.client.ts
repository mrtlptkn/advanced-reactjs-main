/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL, // .env dosyasından okunur, ortama göre değişebilir (dev/staging/prod)
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' }, // APi gönderilecek olan Client bazlı header
});

// key:authorization  value:Bearer Token
// signal -> AbortController.signal. Çağıran taraf isteği iptal etmek isterse buradan iletir.
// Örn: component unmount olduğunda veya kullanıcı sayfadan ayrıldığında bekleyen isteği boşa harcamamak için.
const httpGet = async (
	endpoint: string,
	headers?: Record<string, string>,
	signal?: AbortSignal
) => {
	const response = await axiosClient.get(endpoint, { headers, signal });
	console.log('GET Response:', response.data);
	return response;
};

const httpPost = async (
	endpoint: string,
	headers?: Record<string, string>,
	body?: any // data
) => {
	const response = await axiosClient.post(endpoint, body, {
		headers,
	});
	return response;
};

const httpPut = async (
	endpoint: string,
	headers?: Record<string, string>,
	body?: any // data
) => {
	const response = await axiosClient.put(endpoint, body, {
		headers,
	});
	return response;
};

const httpDelete = async (
	endpoint: string,
	headers?: Record<string, string>,
	body?: any // data
) => {
	const response = await axiosClient.delete(endpoint, {
		headers,
		data: body,
	});
	return response;
};

// tüm istek akışlarını yönetebildiği loglayabildiği merkezi bir client yapısı oluşturduk
// burada request ve response interceptor ekleyerek istek öncesi ve sonrası işlemler yapılabilir

// Request Interceptor
axiosClient.interceptors.request.use(
	(config) => {
		// sunucuya gitmeden önce araya girip header ekleme işlemi yaparız

		const hasToken = false; // örnek token kontrolü

		if (hasToken) {
			const token = 'your-auth-token';
			config.headers.Authorization = `Bearer ${token}`;
		}

		// İstek öncesi işlemler
		console.log('Request Interceptor:', config);
		return config;
	},
	(error) => {
		// İstek hatası işlemleri
		return Promise.reject(error);
	}
);

// Response Interceptor
axiosClient.interceptors.response.use(
	(response) => {
		if (response.status === 401) {
			// yetkisiz erişim işlemleri
			console.log('Unauthorized access - 401');
			// örneğin kullanıcıyı login sayfasına yönlendirebiliriz
			// token refresh işlemi yap
		}
		// Başarı durumu
		// Yanıt öncesi işlemler
		console.log('Response Interceptor:', response);
		return response;
	},
	(error) => {
		// Yanıt hatası işlemleri
		return Promise.reject(error);
	}
);

// herhangi bir httpGet, httpPost, httpPut, httpDelete isteklerinde interceptor araya girip ara işlemler yapmamıza olanak tanır
export const jsonPlaceholderClient = {
	httpGet,
	httpPost,
	httpPut,
	httpDelete,
};
