import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import BodyMainContainer from "@/components/BodyMainContainer";
import Footer from "@/components/Footer";
import Main from "@/components/Main";

export const metadata: Metadata = {
    title: "Велоаксессуары | Notsobikeparts | Notso bike parts",
    description: "Компоненты и аксессуары для вас, вашего велосипеда, байкпакинга, туризма и коммьютинга",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <BodyMainContainer>
                <Header />
                <Main>
                    {children}
                </Main>
                <Footer />
            </BodyMainContainer>
        </html>
    );
}
