import type React from 'react';
import { PageHeader } from '../organisms/PageHeader';

interface ModuleShellProps {
	title: string;
	description?: string;
	techniques?: string[];
	actions?: React.ReactNode;
	children: React.ReactNode;
	narrow?: boolean;
}

// Modül sayfalarının ortak iskeleti: üstte PageHeader, altta sayfanın kendi içeriği.
// Sayfalar kendi state/hook/RTK Query mantığını değiştirmeden bu shell içine sarılır.
export const ModuleShell: React.FC<ModuleShellProps> = ({
	title,
	description,
	techniques,
	actions,
	children,
	narrow = false,
}) => {
	return (
		<div className={narrow ? 'max-w-2xl mx-auto' : ''}>
			<PageHeader
				title={title}
				description={description}
				techniques={techniques}
				actions={actions}
			/>
			<div className="space-y-6">{children}</div>
		</div>
	);
};

export default ModuleShell;
