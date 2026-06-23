/* eslint-disable @typescript-eslint/no-explicit-any */
// https://services.odata.org/northwind/northwind.svc/Products?$format=json&$select=ProductName,UnitPrice&$top=2&$skip=2

import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// https://services.odata.org/northwind/northwind.svc/Products?$format=json&$select=ProductName,UnitPrice,UnitsInStock,ProductID&$top=5

export interface Product {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

// veri çekmek için kullanılan API Endpoints
export const fetchProducts = createAsyncThunk('Product', async () => {
	const response = await axios.get(
		'https://services.odata.org/northwind/northwind.svc/Products?$format=json&$select=ProductName,UnitPrice,UnitsInStock,ProductID&$top=5'
	);
	const data = await response.data;
	return data;
});

// Client State
export type State = {
	loading: boolean;
	data: Product[];
	error: AxiosError | null;
};

const initState: State = { loading: false, data: [], error: null };

const productSlice = createSlice({
	name: 'Products',
	initialState: initState,
	reducers: {
		// senkron veri işlemlerinde kullanılıyor. client state üzerinden hiç server state gerek duymadan state yönetimi yapabiliriz
	},
	extraReducers(builder) {
		// asenkron veri state yönetimi için extraReducers kullanıyoruz.

		builder.addCase(fetchProducts.pending, (state: State) => {
			state.loading = true;
		});
		builder.addCase(
			fetchProducts.fulfilled,
			(state: State, action: PayloadAction<any>) => {
				state.loading = false;
				state.data = action.payload.value;
			}
		);
		builder.addCase(
			fetchProducts.rejected,
			(state: State, action: PayloadAction<any>) => {
				state.loading = false;
				state.data = [];
				state.error = action.payload;
			}
		);
	},
});

// storeda productReducer kullanmak için dışarıya export ettik.
export const productReducer = productSlice.reducer;

// fetchProducts.pending -> Promise.pending -> loading state
// fetchProducts.rejected -> Promise.rejected
// fetchProducts.fulfilled -> Promise.resolve
