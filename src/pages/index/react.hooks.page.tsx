import { useEffect, useRef, useState } from 'react';
import { CustomTextInput, type CustomTextInputHandle } from '../../ui/atoms';
import { Card, CardHeader, CardContent } from '../../ui/molecules';
import { ModuleShell } from '../../ui/templates';

const ReactHooksPage = () => {
	// useStateHook ?
	// useEffectHook ?
	// useState: bileşen içinde state yönetimi sağlar.
	// useEffect: yan etkileri yönetmek için kullanılır (örneğin, veri alma, abonelikler).

	const [random, setRandom] = useState<number>(0);

	// useRef: değer değiştiğinde (state gibi) yeniden render tetiklemeden component ömrü boyunca veri saklamak için kullanılır.
	// Render sayısını tutuyoruz; renderCount.current değişse de bu component yeniden render olmaz.
	// Not: ref değerleri render aşamasında değil, effect veya event handler içinde okunup/yazılmalıdır.
	const renderCount = useRef(0);

	// useImperativeHandle ile dışarıya focus/clear metodları açılan custom input için ref
	const customInputRef = useRef<CustomTextInputHandle>(null);

	// useEffect async çalışır.
	// component did mount -> yükleme aşamasında useEffect ile sayfaya ilk veri çekme işlemi yapılabilir.
	// component will unmount -> sayfa kapanırken yapılacak işlemler için kullanılır.
	// component did update -> state veya prop değişikliklerinde çalışır.
	useEffect(() => {
		console.log('ReactHooksPage bileşeni yüklendi.');

		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json())
			.then((data) => {
				console.log('Veri alındı:', data);
			})
			.catch((error) => {
				console.error('Veri alma hatası:', error);
			});

		return () => {
			console.log('ReactHooksPage bileşeni kaldırıldı.');
		};
	}, []);

	useEffect(() => {
		console.log('random state değeri değişti:', random);
	}, [random]);

	// dependency array vermediğimiz için bu effect her render sonrasında (commit aşamasında) çalışır.
	// ref'i burada güncellemek güvenlidir çünkü render aşaması bitmiştir.
	useEffect(() => {
		renderCount.current += 1;
		console.log('Render sayısı:', renderCount.current);
	});

	const generateRandomNumber = () => {
		const randomNumber = Math.floor(Math.random() * 100) + 1;
		setRandom(randomNumber);
	};

	return (
		<ModuleShell
			title="React Hooks"
			description="This page provides information about React Hooks."
			techniques={['useState', 'useRef', 'useImperativeHandle']}
		>
			<Card>
				<CardHeader>
					<h2 className="text-lg font-semibold text-gray-900">useState</h2>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600 mb-3">Random Number: {random}</p>
					<button
						onClick={generateRandomNumber}
						className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
					>
						Generate Random Number
					</button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<h2 className="text-lg font-semibold text-gray-900">useRef</h2>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600">
						Bu component her render sonrasında bir effect içinde
						renderCount.current değerini artırır ve konsola loglar. ref
						değiştiği için yeniden render tetiklenmez; değeri görmek için
						konsolu açın.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<h2 className="text-lg font-semibold text-gray-900">useImperativeHandle</h2>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600 mb-3">
						CustomTextInput, forwardRef + useImperativeHandle ile dışarıya
						sadece focus/clear metodlarını açar, input'un DOM node'una
						doğrudan erişim vermez.
					</p>
					<CustomTextInput ref={customInputRef} placeholder="Bir şeyler yazın..." />
					<div className="mt-3 space-x-2">
						<button
							onClick={() => customInputRef.current?.focus()}
							className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
						>
							Inputu Focusla
						</button>
						<button
							onClick={() => customInputRef.current?.clear()}
							className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
						>
							Inputu Temizle
						</button>
					</div>
				</CardContent>
			</Card>
		</ModuleShell>
	);
};

// state değişikliğinde return kısmı yeniden çalışır. Biz buna rendering diyoruz.
// sadece random değeri üzerinden render işlemi yapılır.

export default ReactHooksPage;

// virtual dom ?  -> state var ? local state
// virtual dom, gerçek dom ile etkileşimde bulunmadan önce değişiklikleri izleyen hafif bir kopyadır.
// React, bileşenlerin durumunu (state) ve özelliklerini (props) izleyerek virtual DOM'u günceller.
// state değiştiğinde, React virtual DOM'u günceller ve gerçek DOM ile karşılaştırır.
// Bu süreç "reconciliation" olarak adlandırılır.
// React, virtual DOM'daki değişiklikleri gerçek DOM'a minimum sayıda güncelleme yaparak yansıtır.
// Bu sayede performans artar çünkü gerçek DOM manipülasyonları maliyetlidir.
