import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../molecules';

interface PostCardProps {
	children: React.ReactNode;
	className?: string;
}

interface PostCardHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface PostCardContentProps {
	children: React.ReactNode;
	className?: string;
}

interface PostCardFooterProps {
	children: React.ReactNode;
	className?: string;
}

const PostCardRoot: React.FC<PostCardProps> = ({
	children,
	className = '',
}) => {
	return (
		<Card className={className}>
			<div className="p-5">{children}</div>
		</Card>
	);
};

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
	children,
	className = '',
}) => {
	return <CardHeader className={className}>{children}</CardHeader>;
};

const PostCardContent: React.FC<PostCardContentProps> = ({
	children,
	className = '',
}) => {
	return <CardContent className={className}>{children}</CardContent>;
};

const PostCardFooter: React.FC<PostCardFooterProps> = ({
	children,
	className = '',
}) => {
	return <CardFooter className={className}>{children}</CardFooter>;
};

export const PostCard = Object.assign(PostCardRoot, {
	Header: PostCardHeader,
	Content: PostCardContent,
	Footer: PostCardFooter,
});
