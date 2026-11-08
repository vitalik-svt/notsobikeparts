import type { ReactNode } from "react";

import { PageJsonLd } from "@/seo/JsonLd";
import type { SeoPageId } from "@/seo/pages";

export default function SeoPageShell({
    pageId,
    locale,
    children,
}: {
    pageId: SeoPageId;
    locale: string;
    children: ReactNode;
}) {
    return (
        <>
            <PageJsonLd pageId={pageId} locale={locale} />
            {children}
        </>
    );
}
