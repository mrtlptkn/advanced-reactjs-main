import { useContext } from 'react';
import {
	CartContext,
	type CartContextType,
} from '../../context/cart/cart.context';
import CartSummary from './components/cart.summary';

function CartSummaryPage() {
	// yaptığımız şey context içindeki state ve methodlara erişmek. ve güncel state i kullanmak.
	const { cart, clearCart, removeItem } = useContext(
		CartContext
	) as CartContextType;

	return (
		<CartSummary
			cart={cart}
			onRemoveItem={removeItem}
			onClearCart={clearCart}
		/>
	);
}

export default CartSummaryPage;
