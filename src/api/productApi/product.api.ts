import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../store/products/product.slice';

export interface ODataResponse<T> {
	value: T[];
}

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_NORTHWIND_BASE_URL, // .env dosyasından okunur
	}),
	endpoints: (builder) => ({
		// https://services.odata.org/northwind/northwind.svc/Products?$format=json
		getProducts: builder.query<ODataResponse<Product>, void>({
			// endpoint içerisinde bağlşadığım method ismi
			query: () => ({
				url: 'Products', // endpoint tanımı
				headers: {},
				params: {
					$format: 'json', // endpointe tanımlanacak olan queryString varsa
				},
			}),
		}),
		getProductsFilterByName: builder.query<
			ODataResponse<Product>,
			{ name: string }
		>({
			query: ({ name }) => ({
				// https://services.odata.org/northwind/northwind.svc/Products?$filter=substringof('ch', ProductName)&$format=json
				url: 'Products',
				params: {
					$filter: `substringof('${name}',ProductName)`,
					$format: 'json',
				},
			}),
			keepUnusedDataFor: 120, // 120sn cachede kal default 60 saniyelim cache süresinde çalışır.
		}),
	}),
});

// default:60 saniye key cache -> client state deki veri 60 saniye boyunca cachede kalacağı için 60 içinde aynı istek tekrar atılırsa bu durumda api gitmeden verinin cache üzerinden okunmasını sağlayarak performans optimizasyonu yapmış olduk.

// use + getProducts + Query -> Hook Sayfadan çağırılacak olan hookumuz

export const { useGetProductsQuery, useGetProductsFilterByNameQuery } =
	productApi;
