import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Main from "@/components/Main";
import { initI18n } from "@/i18n";
import { i18n } from "@/i18n/settings";
import I18nProvider from "@/providers/I18nProvider";
import { NotificationsProvider } from "@/providers/NotificationsProvider";
import { PopupProvider } from "@/providers/PopupProvider";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { OrganizationJsonLd } from "@/seo/JsonLd";
import { ensureLocale } from "@/utils/ensureLocale";

export function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return buildPageMetadata(`home`, locale);
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = ensureLocale(resolvedParams.locale);

    await initI18n(locale);

    return (
        <I18nProvider locale={locale}>
            <OrganizationJsonLd />
            <NotificationsProvider>
                <PopupProvider>
                    <Header locale={locale} />
                    <Main>
                        {children}
                    </Main>
                    <Footer locale={locale} />
                </PopupProvider>
            </NotificationsProvider>
        </I18nProvider>
    );
}
