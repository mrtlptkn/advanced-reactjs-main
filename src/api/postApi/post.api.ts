import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from '../../model/post';

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL, // .env dosyasından okunur
	}),
	endpoints: (builder) => ({
		getPosts: builder.query<Post[], void>({
			// GET endpoint
			query: () => ({
				url: 'posts', // endpoint tanımı
				headers: {},
				params: {
					$format: 'json', // endpointe tanımlanacak olan queryString varsa
				},
			}),
		}),
		// GET by id endpoint -> dinamik route parametresi (useParams) ile gelen id burada kullanılır.
		getPostById: builder.query<Post, number>({
			query: (id) => `posts/${id}`,
		}),
		// POST endpoint -> Son girilen kaydı ekranda göstermek için cache bozmadan cache verisi üzerine apiden dönen veriyi ekliyoruz. // veri gönderme işlemlerini RTK Query ile yaparken mutation kullanıyoruz.
		addPost: builder.mutation<Post, Partial<Post>>({
			query: (newPost) => ({
				url: 'posts',
				method: 'POST',
				body: newPost,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			// Cache update
			async onQueryStarted(_newPost, { dispatch, queryFulfilled }) {
				try {
                    // kayıut sonrası formdan gönderilen veriyi yakaladığım yer.
					const { data: createdProduct } = await queryFulfilled;

					// getProducts cache'ini manuel güncelle
					dispatch(
						// getPosts cache ismi üzerinden güncelleme yapıyoruz
						postApi.util.updateQueryData('getPosts', undefined, (draft) => {
							// draft -> mevcut cache verisi
                            // createdProduct -> api'den dönen yeni eklenen veri
							draft.unshift(createdProduct);
						})
					);
				} catch (error) {
					console.error('Post eklenemedi', error);
				}
			},
		}),
	}),
});

// use + methodName + Query/Mutation
export const { useAddPostMutation, useGetPostsQuery, useGetPostByIdQuery } =
	postApi;
