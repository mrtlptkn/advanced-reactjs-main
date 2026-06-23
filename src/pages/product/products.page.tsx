import { useContext, useEffect } from 'react';

import {
	CartContext,
	type CartContextType,
} from '../../context/cart/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';

// addItem -> export isimleri aynı olduğu için çakışmayı önlemek adına yeniden adlandırıyoruz.
import { addItem as _addItem } from '../../store/cart/cart.slice';
import { useNavigate } from 'react-router';
import {
	fetchProducts,
	type Product,
} from '../../store/products/product.slice';
import { Card, CardContent, CardFooter } from '../../ui/molecules';
import { ModuleShell } from '../../ui/templates';

const ProductsPage = () => {
	// component üzerinden state değiştirecek olan bir action tetiklememiz gerekiyor.
	// useContext hook ile context listener görevi görür.
	const { addItem } = useContext(CartContext) as CartContextType;
	const dispatch = useDispatch<AppDispatch>();
	const productState = useSelector(
		(rootState: RootState) => rootState.productState
	);
	const navigate = useNavigate();

	useEffect(() => {
		// Product Load From API with Thunk
		// productState clientState olarak birşeyler yüklü ise ozaman tekradanda apidan çağırma
		if (productState.data.length == 0) {
			dispatch(fetchProducts());
		} else {
			// her 5 dakikalık periodda güncel veriyi çek
			setInterval(() => {
				dispatch(fetchProducts());
			}, 1000 * 60 * 5);
		}
	}, []);

	// const data: Product[] = [
	// 	{
	// 		id: '1',
	// 		name: 'Product A',
	// 		price: 29.99,
	// 		description: 'Description for Product A',
	// 		imageUrl: 'https://example.com/product-a.jpg',
	// 		stockQuantity: 100,
	// 	},
	// 	{
	// 		id: '2',
	// 		name: 'Product B',
	// 		price: 49.99,
	// 		description: 'Description for Product B',
	// 		imageUrl: 'https://example.com/product-b.jpg',
	// 		stockQuantity: 50,
	// 	},
	// ];

	const onAddtoCartContextAPI = (data: Product) => {
		console.log(`Product ${data.ProductID} added to cart.`);
		// ilgili methoda  -> redux içtin action'a gönderilen veriye payload denir
		// payload: state değiştirmek için action ile gönderilen veri
		addItem({
			name: data.ProductName,
			productId: data.ProductID,
			price: data.UnitPrice,
			quantity: 1,
		});

		window.alert(`${data.ProductName} sepete eklendi.`);

		// cartProvider içindeki addItem methodunu kullanarak ürünü sepete eklemeliyiz.
	};

	const onAddtoCartReduxToolkit = (data: Product) => {
		dispatch(
			_addItem({
				productId: data.ProductID,
				name: data.ProductName,
				quantity: 1,
				price: data.UnitPrice,
			})
		);
		window.alert(`${data.ProductName} sepete eklendi.`);

		// cartProvider içindeki addItem methodunu kullanarak ürünü sepete eklemeliyiz.
	};

	const cartNavActions = (
		<>
			<button
				onClick={() => navigate('/cart-summary')}
				className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition"
			>
				Sepete Git (Context API)
			</button>
			<button
				onClick={() => navigate('/cart-summary-v2')}
				className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
			>
				Sepete Git (Redux Toolkit)
			</button>
		</>
	);

	if (productState.loading) {
		return (
			<ModuleShell
				title="Products (v1)"
				techniques={['Redux Toolkit Thunk', 'Context API']}
				actions={cartNavActions}
			>
				<p className="text-gray-500">Ürünler Yükleniyor...</p>
			</ModuleShell>
		);
	}

	if (productState.error) {
		return (
			<ModuleShell
				title="Products (v1)"
				techniques={['Redux Toolkit Thunk', 'Context API']}
				actions={cartNavActions}
			>
				<p className="text-red-500">Ürünler yüklenirken bir hata meydana geldi</p>
			</ModuleShell>
		);
	}

	// Hata yoksa sayfamı böyle render et.
	return (
		<ModuleShell
			title="Products (v1)"
			description="Redux Toolkit thunk ile veri çekme; sepete ekleme hem Context API hem Redux Toolkit ile gösterilir."
			techniques={['Redux Toolkit Thunk', 'Context API']}
			actions={cartNavActions}
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{productState.data.map((product) => (
					<Card key={product.ProductID}>
						<CardContent>
							<h2 className="text-lg font-semibold text-gray-900">
								{product.ProductName}
							</h2>
							<p className="text-green-600 mt-1">Price: ${product.UnitPrice}</p>
							<p className="text-blue-600">In Stock: {product.UnitsInStock}</p>
						</CardContent>
						<CardFooter className="flex flex-col gap-2">
							<button
								onClick={() => onAddtoCartContextAPI(product)}
								className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
							>
								Sepete Ekle (Context API)
							</button>
							<button
								onClick={() => onAddtoCartReduxToolkit(product)}
								className="w-full px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition"
							>
								Sepete Ekle (Redux Toolkit)
							</button>
						</CardFooter>
					</Card>
				))}
			</div>
		</ModuleShell>
	);
};

export default ProductsPage;
