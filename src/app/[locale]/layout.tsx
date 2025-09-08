import { initI18n } from "@/i18n";
import type { Metadata } from "next";
import BodyMainContainer from "@/components/BodyMainContainer";
import Header from "@/components/Header/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import I18nProvider from "@/providers/I18nProvider";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const baseUrl = "https://example.com";
    const locale = params.locale;

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

    await initI18n(resolvedParams.locale);

    return (
        <I18nProvider locale={resolvedParams.locale}>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer locale={resolvedParams.locale} />
        </I18nProvider>
    );
}
