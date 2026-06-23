// ilk adım context oluşturma ve contextTypeları oluşturma ve contextState oluşturma

import { useReducer } from 'react';
import { CartContext, initialCartState } from './cart.context';
import type { CartState } from '../../model/cart';

// useContext ile Context içerisinde state ve methodlara erişebiliriz.

// Karmaşık state güncellemelerinde (birden fazla alanın birbirine bağlı şekilde değişmesi gibi) useState yerine
// useReducer kullanmak, güncelleme mantığını component dışına çıkarıp tek bir yerde (reducer) toplamamızı sağlar.
// Redux'taki reducer mantığıyla birebir aynıdır, sadece store yerine component local state'i yönetir.

type CartItem = CartState['items'][number];

type CartAction =
	| { type: 'ADD_ITEM'; payload: CartItem }
	| { type: 'REMOVE_ITEM'; payload: { productId: number } }
	| { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD_ITEM': {
			const { productId, price, quantity } = action.payload;
			const existingItem = state.items.find(
				(item) => item.productId === productId
			);

			// aynı üründen eklenirse quantity artırılır, yoksa yeni item olarak eklenir.
			const items = existingItem
				? state.items.map((item) =>
						item.productId === productId
							? { ...item, quantity: item.quantity + quantity }
							: item
				  )
				: [...state.items, action.payload];

			return {
				items,
				total: state.total + price * quantity,
			};
		}
		case 'REMOVE_ITEM': {
			const itemToRemove = state.items.find(
				(item) => item.productId === action.payload.productId
			);
			if (!itemToRemove) return state;

			return {
				items: state.items.filter(
					(item) => item.productId !== action.payload.productId
				),
				total: state.total - itemToRemove.price * itemToRemove.quantity,
			};
		}
		case 'CLEAR_CART':
			return { items: [], total: 0 };
		default:
			return state;
	}
}

// Cart State güncelleme işlemlerini provider ile yapıyoruz.
const CartProvider = ({ children }: { children: React.ReactNode }) => {
	// state yönetimi için useReducer kullanımı: [state, dispatch]
	const [cart, dispatch] = useReducer(cartReducer, initialCartState);

	// sepete ürün ekleme işlevi -> dispatch ile reducer'a bir action gönderiyoruz
	const addItem = (item: CartItem) => {
		dispatch({ type: 'ADD_ITEM', payload: item });
	};

	const removeItem = (productId: number) => {
		dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
	};

	// Provider içerisinde tanımlı olan componentlerin tüketeceği Context.Consumer lere sağlanacak değerler
	const values = {
		cart,
		addItem,
		removeItem,
		clearCart,
	};

	// <CartProvider>
	// <UserInfo />
	// <UserProfile />
	// </CartProvider> ile sarmalanan componentlere context değerlerini sağlar

	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;

// Bu yapının uygulama geneline yansıtılması için Provider tanımını src/main.tsx tüm uygulamadaki componentleri sarmalayacak şekilde eklememiz gerekiyor.
