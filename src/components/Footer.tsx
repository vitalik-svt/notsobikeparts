"use client";

import Link from "next/link";
import Select from "./Select";
import Image from "next/image";
import { CONTACTS } from "@/constants/contacts";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const year = new Date().getFullYear();

export default function Footer({ locale }: { locale: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();

    const handleChange = (locale: string) => {
        const newPath = pathname.replace(/^\/(ru|en)/, `/${locale}`);
        router.push(newPath);
    };

    return (
        <footer className="flex justify-between items-center max-w-[1000px] mx-auto w-full text-xl leading-tight p-4">
            <p className="">
                notsobikeparts, {year}
            </p>
            <p className="flex gap-3 items-center">
                <Link href={CONTACTS.INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    <Image src="/insta.webp" alt={t("footer.instagram")} width={28} height={28} />
                </Link>
                <Link href={`mailto:${CONTACTS.EMAIL}`}>
                    <Image src="/email.webp" alt={t("footer.email")} width={36} height={36} />
                </Link>
            </p>
            <Select
                icon={<Image src="/language.webp" alt="" width={28} height={28} />}
                className="uppercase text-base"
                onChange={handleChange}
                options={[
                    { label: "русский", locale: "ru" },
                    { label: "english", locale: "en" },
                ]}
                value={locale}
            />
        </footer>
    );
}
