import React from 'react';

interface TypographyProps {
	renderAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	children: React.ReactNode;
	className?: string;
}

// children ile component içine istediğimiz HTML etiketini yerleştirebiliriz hatta istediğimiz kadar component ekleyebiliriz. Tasarımı esnek tutar ve özelleştirmeye olanak tanır.
// children isim önemli bu isimde olmalı

export const Typography: React.FC<TypographyProps> = ({
	renderAs: Component = 'p',
	children,
	className = '',
}) => {
	return <Component className={className}>{children}</Component>;
};

{
	/* <Typography renderAs='h1'>
    Hello, World!
    <p>
        This is a sample paragraph inside the Typography component.
    </p>
</Typography> */
}
