"use client";

import Link from "next/link";
import Select from "./Select";
import Image from "next/image";
import { CONTACTS } from "@/constants/contacts";

const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row gap-5 justify-between items-center max-w-[1000px] mx-auto w-full text-xl leading-tight px-5 pt-8 pb-10 md:py-7">
            <p>notsobikeparts, {year}</p>
            <p className="flex gap-4 items-center">
                <Link href={CONTACTS.INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    <Image src="/insta.webp" alt="Instagram" width={28} height={28} />
                </Link>
                <Link href={`mailto:${CONTACTS.EMAIL}`}>
                    <Image src="/email.webp" alt="Email" width={36} height={36} />
                </Link>
            </p>
            <Select
                icon={<Image src="/language.webp" alt="Language" width={28} height={28} />}
                className="uppercase text-base"
                onChange={(value) => console.log(value)}
                options={[
                    { label: "русский", value: "ru-RU" },
                    { label: "english", value: "en-US" },
                ]}
            />
        </footer>
    );
}
