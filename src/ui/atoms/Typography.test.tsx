import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
	it('varsayılan olarak p etiketi render eder', () => {
		render(<Typography>Merhaba</Typography>);
		expect(screen.getByText('Merhaba').tagName).toBe('P');
	});

	it('renderAs prop ile farklı bir HTML etiketi render edebilir', () => {
		render(<Typography renderAs="h1">Başlık</Typography>);
		expect(screen.getByText('Başlık').tagName).toBe('H1');
	});
});
