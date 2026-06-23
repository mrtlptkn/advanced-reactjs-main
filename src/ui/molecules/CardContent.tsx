import React from 'react';

interface CardContentProps {
	children: React.ReactNode;
	className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
	children,
	className = '',
}) => {
	return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};
