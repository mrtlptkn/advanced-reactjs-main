import { Typography } from '../../../ui';

type CartSummaryProps = {
	cart: {
		items: Array<{
			productId: number;
			name: string;
			quantity: number;
			price: number;
		}>;
		total: number;
	};
	onRemoveItem: (productId: number) => void;
	onClearCart: () => void;
};

const CartSummary = ({ cart, onRemoveItem, onClearCart }: CartSummaryProps) => {
	const hasItems = cart.items && cart.items.length > 0;

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<Typography
						renderAs="h1"
						className="text-3xl font-bold text-gray-900"
					>
						Shopping Cart
					</Typography>
					<Typography className="text-gray-600 mt-2">
						{hasItems
							? `${cart.items.length} ${
									cart.items.length === 1 ? 'item' : 'items'
							  } in your cart`
							: 'Your cart is empty'}
					</Typography>
				</div>

				{hasItems ? (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2 space-y-4">
							{cart.items.map((item, index) => (
								<div
									key={`${item.productId}-${index}`}
									className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex items-start gap-4">
										{/* Product Image Placeholder */}
										<div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Typography className="text-2xl font-bold text-gray-400">
												{item.name.charAt(0)}
											</Typography>
										</div>

										{/* Product Details */}
										<div className="flex-1 min-w-0">
											<Typography
												renderAs="h3"
												className="text-lg font-semibold text-gray-900 mb-1"
											>
												{item.name}
											</Typography>

											<div className="flex items-center justify-between">
												{/* Quantity */}
												<div className="flex items-center gap-3">
													<Typography className="text-sm text-gray-600">
														Quantity:
													</Typography>
													<div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
														<button className="text-gray-600 hover:text-gray-900">
															-
														</button>
														<Typography className="font-semibold min-w-[20px] text-center">
															{item.quantity}
														</Typography>
														<button className="text-gray-600 hover:text-gray-900">
															+
														</button>
													</div>
												</div>

												{/* Price */}
												<div className="text-right">
													<Typography className="text-sm text-gray-500">
														${Number(item.price.toString()).toFixed(2)} each
													</Typography>
													<Typography className="text-lg font-bold text-gray-900">
														${item.price * item.quantity}
													</Typography>
												</div>
											</div>
										</div>

										{/* Remove Button */}
										<button
											onClick={() => onRemoveItem(item.productId)}
											className="text-gray-400 hover:text-red-500 transition-colors p-2"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
							))}

							<button
								onClick={onClearCart}
								className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
							>
								Sepeti Temizle
							</button>
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
								<Typography
									renderAs="h2"
									className="text-xl font-bold text-gray-900 mb-6"
								>
									Order Summary
								</Typography>

								<div className="space-y-3 mb-6">
									<div className="flex justify-between">
										<Typography className="text-gray-600">Subtotal</Typography>
										<Typography className="font-semibold">
											${cart.total.toFixed(2)}
										</Typography>
									</div>
									<div className="flex justify-between">
										<Typography className="text-gray-600">Shipping</Typography>
										<Typography className="font-semibold">$5.00</Typography>
									</div>
									<div className="flex justify-between">
										<Typography className="text-gray-600">Tax</Typography>
										<Typography className="font-semibold">
											${(cart.total * 0.08).toFixed(2)}
										</Typography>
									</div>
									<div className="border-t border-gray-200 pt-3 mt-3">
										<div className="flex justify-between items-center">
											<Typography className="text-lg font-bold text-gray-900">
												Total
											</Typography>
											<Typography className="text-2xl font-bold text-gray-900">
												${(cart.total + 5 + cart.total * 0.08).toFixed(2)}
											</Typography>
										</div>
									</div>
								</div>

								<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-3">
									Proceed to Checkout
								</button>

								<button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors">
									Continue Shopping
								</button>

								{/* Trust Badges */}
								<div className="mt-6 pt-6 border-t border-gray-200">
									<div className="space-y-3">
										<div className="flex items-center gap-3 text-sm text-gray-600">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5 text-green-600"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>Secure payment</span>
										</div>
										<div className="flex items-center gap-3 text-sm text-gray-600">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5 text-green-600"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V11.25m-18 0h16.5a1.125 1.125 0 011.125 1.125v4.875"
												/>
											</svg>
											<span>Free shipping over $50</span>
										</div>
										<div className="flex items-center gap-3 text-sm text-gray-600">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5 text-green-600"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
												/>
											</svg>
											<span>30-day return policy</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					/* Empty Cart */
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
						<div className="max-w-md mx-auto">
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 text-gray-400"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
									/>
								</svg>
							</div>
							<Typography
								renderAs="h2"
								className="text-2xl font-bold text-gray-900 mb-2"
							>
								Your cart is empty
							</Typography>
							<Typography className="text-gray-600 mb-6">
								Looks like you haven't added any items to your cart yet.
							</Typography>
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
								Start Shopping
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartSummary;
