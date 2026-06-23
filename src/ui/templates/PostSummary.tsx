import React from 'react';
import { PostCard } from '../organisms';
import { Link, Typography } from '../atoms';
import { UserInfo } from '../molecules';

interface PostItem {
	userInfo: {
		name: string;
		date: string;
		avatarUrl: string;
	};
	title: string;
	contentText: string;
	link: string;
}

export interface PostListProps {
	item: PostItem[];
	children?: React.ReactNode;
}

const PostSummary: React.FC<PostListProps> = ({
	item,
	children,
}: {
	item: PostItem[];
	children?: React.ReactNode;
}) => {
	return (
		<div>
			{item.map((post, index) => (
				<div className="mb-6 p-4" key={index}>
					<PostCard key={index}>
						<PostCard.Header>
							<Typography
								renderAs="h3"
								className="text-xl font-bold text-gray-800"
							>
								{post.title}
							</Typography>
						</PostCard.Header>
						<PostCard.Content>
							<Typography className="text-gray-600 text-sm leading-relaxed mb-2">
								{post.contentText}
							</Typography>
							<Link href="#" className="text-sm font-medium">
								{post.link}
							</Link>
						</PostCard.Content>
						<PostCard.Footer>
							<UserInfo
								userName={post.userInfo.name}
								date={post.userInfo.date}
								userInitials={post.userInfo.avatarUrl}
							/>
						</PostCard.Footer>
					</PostCard>
				</div>
			))}

			{children}
		</div>
	);
};

export default PostSummary;
