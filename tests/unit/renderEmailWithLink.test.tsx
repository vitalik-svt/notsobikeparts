import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderEmailWithLink } from '@/utils/renderEmailWithLink';

describe('renderEmailWithLink', () => {
    test('returns plain string when email is not found in text', () => {
        const result = renderEmailWithLink('Contact us for help', 'info@example.com');
        expect(result).toBe('Contact us for help');
    });

    test('renders anchor tag with mailto href when email is found', () => {
        const email = 'info@example.com';
        const text = `Please contact ${email} for details`;
        render(<>{renderEmailWithLink(text, email)}</>);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `mailto:${email}`);
        expect(link).toHaveTextContent(email);
    });

    test('renders text before email correctly', () => {
        const email = 'info@example.com';
        const text = `Please contact ${email} for details`;
        const { container } = render(<>{renderEmailWithLink(text, email)}</>);

        expect(container.textContent).toContain('Please contact ');
    });

    test('renders text after email correctly', () => {
        const email = 'info@example.com';
        const text = `Please contact ${email} for details`;
        const { container } = render(<>{renderEmailWithLink(text, email)}</>);

        expect(container.textContent).toContain(' for details');
    });

    test('renders correctly when email is at the start of the string', () => {
        const email = 'info@example.com';
        const text = `${email} is our contact`;
        const { container } = render(<>{renderEmailWithLink(text, email)}</>);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `mailto:${email}`);
        expect(container.textContent).toBe(`${email} is our contact`);
    });

    test('renders correctly when email is at the end of the string', () => {
        const email = 'info@example.com';
        const text = `Write to ${email}`;
        const { container } = render(<>{renderEmailWithLink(text, email)}</>);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `mailto:${email}`);
        expect(container.textContent).toBe(`Write to ${email}`);
    });

    test('anchor has underline class', () => {
        const email = 'info@example.com';
        render(<>{renderEmailWithLink('Send email to info@example.com here', email)}</>);

        expect(screen.getByRole('link')).toHaveClass('underline');
    });
});
