import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function NavMenu() {
    return (
        <nav className="flex space-x-12 text-2xl">
            <Link href={ROUTES.HOME} className="hover:text-blue-500">продукты</Link>
            <Link href={ROUTES.ABOUT} className="hover:text-blue-500">разное</Link>
            <Link href={ROUTES.POSTS} className="hover:text-blue-500">купить</Link>
        </nav>
    );
}
