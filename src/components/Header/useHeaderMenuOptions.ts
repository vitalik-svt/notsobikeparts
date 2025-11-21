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
                            imageSrc: '/images/menu/topcap-serial.webp',
                            href: ROUTES.TOPCAPS
                        },
                        {
                            label: t("menu.topcaps.custom"),
                            imageSrc: '/images/menu/topcap-custom.webp',
                            href: ROUTES.TOPCAPS_CUSTOM
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
                            imageSrc: '/images/menu/cage-little.webp',
                            href: ROUTES.CAGE_LITTLE
                        },
                        {
                            label: t("menu.cages.plus"),
                            imageSrc: '/images/menu/cage-plus.webp',
                            href: ROUTES.CAGE_PLUS
                        },
                        {
                            label: t("menu.cages.front"),
                            imageSrc: '/images/menu/cage-front.webp',
                            href: ROUTES.CAGE_FRONT
                        },
                        {
                            label: t("menu.cages.volume"),
                            imageSrc: '/images/menu/cage-volume.webp',
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
            label: t("menu.cart"),
            href: ROUTES.CART,
            hasCounter: true,
        }
    ];

    return menuOptions;
};
