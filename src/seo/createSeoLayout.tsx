import type { Metadata } from "next";
import type { ReactNode } from "react";

import { buildPageMetadata } from "@/seo/buildPageMetadata";
import type { SeoPageId } from "@/seo/pages";
import SeoPageShell from "@/seo/SeoPageShell";

type LayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export function createSeoLayout(pageId: SeoPageId) {
    async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
        const { locale } = await params;
        return buildPageMetadata(pageId, locale);
    }

    async function Layout({ children, params }: LayoutProps) {
        const { locale } = await params;
        return (
            <SeoPageShell pageId={pageId} locale={locale}>
                {children}
            </SeoPageShell>
        );
    }

    return { generateMetadata, Layout };
}
