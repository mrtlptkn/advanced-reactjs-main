import React from 'react';

interface CardFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
	children,
	className = '',
}) => {
	return (
		<div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
			{children}
		</div>
	);
};
