import { JSX } from "react";

export const renderEmailWithLink = (text: string, email: string): JSX.Element | string => {
    const index = text.indexOf(email);
    if (index === -1) return text;

    const before = text.slice(0, index);
    const after = text.slice(index + email.length);

    return (
        <>
            {before}
            <a href={`mailto:${email}`} className="underline">{email}</a>
            {after}
        </>
    );
}