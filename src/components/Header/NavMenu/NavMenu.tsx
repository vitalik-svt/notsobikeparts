import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

interface Props {
    classNames?: string;
}

export default function NavMenu({ classNames }: Props) {
    return (
        <nav className={`space-x-12 text-2xl ${classNames}`}>
            <Link href={ROUTES.HOME} className="hover:text-blue-500">продукты</Link>
            <Link href={ROUTES.ABOUT} className="hover:text-blue-500">разное</Link>
            <Link href={ROUTES.POSTS} className="hover:text-blue-500">купить</Link>
        </nav>
    );
}
