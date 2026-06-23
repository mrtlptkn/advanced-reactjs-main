import React from 'react';

// Atomlarda state ihityacı yok. 

interface ProfileCircleProps {
	initials?: string;
	imageUrl?: string;
	alt?: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export const ProfileCircle: React.FC<ProfileCircleProps> = ({
	initials,
	imageUrl,
	alt = 'Profile',
	size = 'md',
	className = '',
}) => {
	const sizeClasses = {
		sm: 'w-8 h-8 text-xs',
		md: 'w-10 h-10 text-sm',
		lg: 'w-12 h-12 text-base',
	};

	if (imageUrl) {
		return (
			<img
				src={imageUrl}
				alt={alt}
				className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
			/>
		);
	}

	return (
		<div
			className={`rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold ${sizeClasses[size]} ${className}`}
		>
			{initials || 'A'}
		</div>
	);
};
