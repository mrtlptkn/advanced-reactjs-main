import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './StatsPanel.module.scss';

// Bu component route bazlı değil, buton tıklanana kadar hiç indirilmeyen (kod bölümlenmiş) bir component örneğidir.
// home.page.tsx içinde React.lazy + Suspense ile çağrılır. Stil olarak Tailwind yerine CSS Module + SCSS kullanır.
function StatsPanel() {
	const cartState = useSelector((state: RootState) => state.cartState);
	const productState = useSelector((state: RootState) => state.productState);

	return (
		<div className={styles.panel}>
			<h2 className={styles.title}>İstatistikler</h2>
			<ul className={styles.list}>
				<li>Sepetteki ürün sayısı: {cartState.items.length}</li>
				<li>Sepet toplamı: ${cartState.total.toFixed(2)}</li>
				<li>Thunk ile yüklenen ürün sayısı: {productState.data.length}</li>
			</ul>
		</div>
	);
}

export default StatsPanel;
