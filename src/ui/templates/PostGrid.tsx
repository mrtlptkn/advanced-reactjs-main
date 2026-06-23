function PostGrid() {
	return (
		<div className="mb-6 p-4">
			<table className="w-full table-auto border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-200">
						<th className="border border-gray-300 px-4 py-2 text-left">
							Title
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							Content
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">Link</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							User Name
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border border-gray-300 px-4 py-2">
							React ve TypeScript ile Modern Web Geliştirme
						</td>
						<td className="border border-gray-300 px-4 py-2">
							React ve TypeScript kombinasyonu, modern web uygulamaları
							geliştirmek için güçlü bir temel sağlar. Type safety ve
							component-based mimari ile daha güvenli ve sürdürülebilir kodlar
							yazabilirsiniz.
						</td>
						<td className="border border-gray-300 px-4 py-2">detail</td>
						<td className="border border-gray-300 px-4 py-2">Ali</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default PostGrid;
