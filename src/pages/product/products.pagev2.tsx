/* eslint-disable @typescript-eslint/no-explicit-any */
// addItem -> export isimleri aynı olduğu için çakışmayı önlemek adına yeniden adlandırıyoruz.
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { addItem as _addItem } from '../../store/cart/cart.slice';
import { useGetProductsFilterByNameQuery } from '../../api/productApi/product.api';
import { type Product } from '../../store/products/product.slice';
import debounce from '../../utils/debounce';
import { Card, CardContent, CardFooter } from '../../ui/molecules';
import { ModuleShell } from '../../ui/templates';

const ProductsV2Page = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	// useSearchParams: arama metnini state olarak değil, URL query string'inde (?q=...) tutuyoruz.
	// Bu sayede sayfa yenilense veya link paylaşılsa bile arama sonucu URL üzerinden korunur.
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchText, setSearchText] = useState<string>(
		searchParams.get('q') ?? ''
	);
	// const { isLoading, data, error } = useGetProductsQuery();

	// elimizdeki bir state değeri değiştirğinde searchText -> yeni parametre üzerinden çalışması gerektiğinde sayfanın yeniden render alınması gerekir.
	const { isLoading, data, error } = useGetProductsFilterByNameQuery(
		{
			name: searchText,
		},
		{
			skip: false, // cache bozunalan kadar atlat default true -> fetch etme
			// pollingInterval: 3000, // 3s de bir arka planda veriyi güncelle -> setInterval ile yaptığımız -> cache invalid olursa yeniden veri çeker.
			refetchOnFocus: true, // Tarayıca Tab arası geçişlerde geri verinin yüklü olduğu taba dönünce yeniden refetch et
			refetchOnReconnect: true,

			// Internet bağlantısı gidip gelince yeniden güncel veriyi refetch et
		}
	);

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

	// backend tarafında 300ms rama işlemlerinde istek attırdık.
	// arama değeri hem local state'i hem de URL'deki ?q= parametresini güncelliyor.
	// useMemo ile debounce fonksiyonu component'in ömrü boyunca sadece bir kez oluşturulur;
	// aksi halde her render'da yeni bir debounce instance'ı (ve içindeki timer) sıfırlanırdı.
	const onSearchHandler = useMemo(
		() =>
			debounce((e: any) => {
				const value = e.target.value;
				setSearchText(value);
				setSearchParams(value ? { q: value } : {});
			}, 300),
		[setSearchParams]
	);

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

	if (isLoading) {
		return (
			<ModuleShell title="Products (v2)" techniques={['RTK Query']} actions={cartNavActions}>
				<p className="text-gray-500">Veri Yükleniyor...</p>
			</ModuleShell>
		);
	}

	if (error) {
		return (
			<ModuleShell title="Products (v2)" techniques={['RTK Query']} actions={cartNavActions}>
				<p className="text-red-500">Veri yüklenirken bir hata meydana geldi</p>
			</ModuleShell>
		);
	}

	// Hata yoksa sayfamı böyle render et.
	return (
		<ModuleShell
			title="Products (v2)"
			description="RTK Query ile veri çekme; arama metni useSearchParams üzerinden URL'de tutulur."
			techniques={['RTK Query']}
			actions={cartNavActions}
		>
			<div>
				<input
					defaultValue={searchText}
					onChange={(e) => onSearchHandler(e)}
					type="text"
					placeholder="Ürün ismini yazınız"
					className="rounded-lg border border-gray-300 px-4 py-2 text-sm
         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
         outline-none transition w-full sm:w-72"
				/>

				{/* useLocation örneği: o anki URL bilgisini (pathname + query string) okuyup gösteriyoruz */}
				<p className="text-xs text-gray-400 mt-2">
					Güncel URL: {location.pathname}
					{location.search}
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{data?.value.map((product) => (
					<Card key={product.ProductID}>
						<CardContent>
							<h2 className="text-lg font-semibold text-gray-900">
								{product.ProductName}
							</h2>
							<p className="text-green-600 mt-1">Price: ${product.UnitPrice}</p>
							<p className="text-blue-600">In Stock: {product.UnitsInStock}</p>
						</CardContent>
						<CardFooter>
							<button
								onClick={() => onAddtoCartReduxToolkit(product)}
								className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
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

export default ProductsV2Page;
