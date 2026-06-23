import React from 'react';

interface CardHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
	children,
	className = '',
}) => {
	return <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>;
};
