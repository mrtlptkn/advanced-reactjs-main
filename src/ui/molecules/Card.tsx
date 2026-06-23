import React from 'react';

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
	return (
		<article
			className={`bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
		>
			{children}
		</article>
	);
};
