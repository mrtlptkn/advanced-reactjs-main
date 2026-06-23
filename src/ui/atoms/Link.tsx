import React from 'react';

interface LinkProps {
	href: string;
	children: React.ReactNode; // children -> Bu react için özel bir değer, Eğer component için başka comonent veya html elementi geçmek istersek children kullanırız. React.ReactNode -> string, number, react element, array of react elements gibi değerleri kapsar.
	className?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	rel?: string;
}




export const Link: React.FC<LinkProps> = ({
	href,
	children, // bu keytword olmadan bir component'e başka component veya html elementi geçemeyiz.
	className = '',
	target = '_self',
	rel,
}) => {
	return (
		<a
		    style={{ textDecoration: 'none' }} // linkin altını çizmemesi için
			href={href}
			target={target}
			rel={rel}
			className={`text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 ${className}`}
		>
			{children}
		</a>
	);
};
