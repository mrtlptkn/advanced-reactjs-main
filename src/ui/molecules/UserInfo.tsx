import React from 'react';
import { ProfileCircle, Typography, Icon } from '../atoms';

// Moleküller  atomlardan oluşabilir. 

interface UserInfoProps {
	userName: string;
	date: string;
	userInitials?: string;
	userImageUrl?: string;
	className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
	userName,
	date,
	userInitials,
	userImageUrl,
	className = '',
}) => {
	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<ProfileCircle
				initials={userInitials}
				imageUrl={userImageUrl}
				alt={userName}
				size="md"
			/>
			<p>
				Deneme
			</p>
			<div className="flex items-center gap-2 text-sm text-gray-500">
				<Typography renderAs="span" className="font-medium text-gray-700">
					{userName}
				</Typography>
				<span className="text-gray-400">•</span>
				<div className="flex items-center gap-1">
					<Icon name="calendar" size="sm" className="text-gray-400" />
					<Typography renderAs="span">{date}</Typography>
				</div>
			</div>
		</div>
	);
};
