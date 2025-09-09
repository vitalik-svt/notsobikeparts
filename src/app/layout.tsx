import type { Metadata } from "next";
import "./globals.css";
import BodyMainContainer from "@/components/BodyMainContainer";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Велоаксессуары | Notsobikeparts | Notso bike parts",
    description: "Компоненты и аксессуары для вас, вашего велосипеда, байкпакинга, туризма и коммьютинга",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <BodyMainContainer>{children}</BodyMainContainer>
        </html>
    );
}
