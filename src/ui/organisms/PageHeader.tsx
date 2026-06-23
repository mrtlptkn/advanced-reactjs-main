import type React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography } from '../atoms';

interface PageHeaderProps {
	title: string;
	description?: string;
	techniques?: string[];
	actions?: React.ReactNode;
}

// Her modül sayfasının başında kullanılan ortak başlık bloğu: sayfa adı, kısa açıklama,
// o sayfanın hangi React tekniğini gösterdiğini belirten chip'ler ve opsiyonel aksiyon alanı.
export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	description,
	techniques,
	actions,
}) => {
	return (
		<div className="mb-6 pb-6 border-b border-gray-200">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<Typography renderAs="h1" className="text-2xl font-bold text-gray-900">
						{title}
					</Typography>
					{description && (
						<Typography className="text-gray-600 mt-1 max-w-2xl">
							{description}
						</Typography>
					)}
					{techniques && techniques.length > 0 && (
						<Stack direction="row" spacing={1} className="mt-3" flexWrap="wrap" useFlexGap>
							{techniques.map((technique) => (
								<Chip key={technique} label={technique} size="small" color="primary" variant="outlined" />
							))}
						</Stack>
					)}
				</div>

				{actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
			</div>
		</div>
	);
};

export default PageHeader;
