import "keen-slider/keen-slider.min.css";
import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import BodyMainContainer from "@/components/BodyMainContainer";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { i18n } from "@/i18n/settings";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} | bike accessories`,
        template: `%s`,
    },
    description: `Bike parts and accessories for commuting, touring, and bikepacking.`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang={i18n.defaultLocale}>
            <BodyMainContainer>{children}</BodyMainContainer>
        </html>
    );
}
