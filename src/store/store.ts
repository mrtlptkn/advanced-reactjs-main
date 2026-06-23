import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart/cart.slice';
import { productReducer } from './products/product.slice';
import { productApi } from '../api/productApi/product.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from '../api/postApi/post.api';
// ...
// state merkezi olarak store da tutulacaksa, slice lar burada import edilip eklenir.
export const store = configureStore({
	reducer: {
		cartState: cartReducer, // Slice ekleme şekli
		productState: productReducer, // THUNK ekleme şekli
		[productApi.reducerPath]: productApi.reducer, // RTK Query ekleme şekli
		[postApi.reducerPath]: postApi.reducer,
	}, // burada slice ların reducer ları eklenir. örn: userState: userReducer
	// bu kısım state tanımı ve store üzerinde middleware ekleme gibi işlemler için kullanılabilir.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productApi.middleware, postApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// Uygulama genelikteki tüm state in tipini çıkarsamak için kullanılır.
export type RootState = ReturnType<typeof store.getState>;
// Uygulama genelinde state güncellemek için kullanılan fonksiyon. dispatch fonksiyonunun tipini çıkarsamak için kullanılır.
export type AppDispatch = typeof store.dispatch;

// Store un kendisinin tipi, store ile ilgili işlemler için kullanılabilir.
export type AppStore = typeof store;
