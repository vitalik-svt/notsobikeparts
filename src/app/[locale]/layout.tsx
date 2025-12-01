import { initI18n } from "@/i18n";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import I18nProvider from "@/providers/I18nProvider";
import { PopupProvider } from "@/providers/PopupProvider";
import { NotificationsProvider } from "@/providers/NotificationsProvider";
import { ensureLocale } from "@/utils/ensureLocale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const baseUrl = "https://example.com";
    const { locale } = await params;

    return {
        title: locale === "ru" ? "Notsobikeparts | Велокомпоненты" : "Notsobikeparts | Bike Parts",
        description:
            locale === "ru"
                ? "Компоненты и аксессуары для велосипедов, туризма и байкпакинга."
                : "Bike parts and accessories for commuting, touring, and bikepacking.",
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                en: `${baseUrl}/en`,
                ru: `${baseUrl}/ru`,
            },
        },
    };
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
