import { ROUTES } from "@/constants/routes";
import { MenuItem } from "@/types/menu";
import { useTranslation } from "react-i18next";

export const useHeaderMenuOptions = () => {
    const { t } = useTranslation();

    const menuOptions: MenuItem[] = [
        {
            label: t("menu.products"),
            submenu: [
                {
                    label: t("menu.topcaps"),
                    submenu: [
                        {
                            label: t("menu.topcaps.series"),
                            href: ROUTES.TOP_CAPS
                        },
                        {
                            label: t("menu.topcaps.custom"),
                            href: ROUTES.TOP_CAPS
                        }
                    ],
                },
                {
                    label: t("menu.voile"),
                    href: ROUTES.VOILE_STRAP
                },
                {
                    label: t("menu.cages"),
                    submenu: [
                        {
                            label: t("menu.cages.little"),
                            href: ROUTES.CAGE_LITTLE
                        },
                        {
                            label: t("menu.cages.plus"),
                            href: ROUTES.CAGES
                        },
                        {
                            label: t("menu.cages.front"),
                            href: ROUTES.CAGE_FRONT
                        },
                        {
                            label: t("menu.cages.volume"),
                            href: ROUTES.CAGE_VOLUME
                        },
                    ],
                },
                {
                    label: t("menu.feedbag_hanger"),
                    href: ROUTES.FEEDBAG_HANGER
                },
                {
                    label: t("menu.chain_breaker"),
                    href: ROUTES.CHAIN_BREAKER
                },
            ]
        },
        {
            label: t("menu.other"),
            submenu: [
                {
                    label: t("menu.other.itchy_and_scratchy"),
                    href: ROUTES.ITCHY_AND_SCRATCHY
                },
                {
                    label: t("menu.other.merch"),
                    href: ROUTES.MERCH
                },
                {
                    label: t("menu.other.test_ride"),
                    href: ROUTES.TEST_RIDE
                },
            ]
        },
        {
            label: t("menu.buy"),
            href: ROUTES.BUY,
        }
    ];

    return menuOptions;
};
