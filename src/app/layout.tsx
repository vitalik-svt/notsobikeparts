import "keen-slider/keen-slider.min.css";
import "./globals.css";

import type { Metadata } from "next";
import { ReactNode } from "react";

import BodyMainContainer from "@/components/BodyMainContainer";

export const metadata: Metadata = {
    title: `Велоаксессуары | notsobikeparts | notso bike parts`,
    description: `Компоненты и аксессуары для вас, вашего велосипеда, байкпакинга, туризма и коммьютинга`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <BodyMainContainer>{children}</BodyMainContainer>
        </html>
    );
}
