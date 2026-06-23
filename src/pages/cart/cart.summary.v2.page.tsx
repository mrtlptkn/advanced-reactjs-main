import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem } from '../../store/cart/cart.slice';
import type { AppDispatch, RootState } from '../../store/store';
import CartSummary from './components/cart.summary';
function CartSummaryV2Page() {
	// yaptığımız şey context içindeki state ve methodlara erişmek. ve güncel state i kullanmak.
	// Redux ile store üzerinde state güncelleme ve okuma yapıyoruz.
	const cartState = useSelector((state: RootState) => state.cartState); // okuma
	const dispatch = useDispatch<AppDispatch>(); // güncelleme için dispatch fonksiyonunu alıyoruz.

	return (
		<CartSummary
			cart={cartState}
			onRemoveItem={(productId: number) => dispatch(removeItem({ productId }))}
			onClearCart={() => dispatch(clearCart())}
		/>
	);
}

export default CartSummaryV2Page;
