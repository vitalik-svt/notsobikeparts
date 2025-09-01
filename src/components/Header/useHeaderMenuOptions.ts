import { ROUTES } from "@/constants/routes";
import { MenuItem } from "@/types/menu";

const menuOptions: MenuItem[] = [
    {
        label: "продукты",
        submenu: [
            {
                label: "топкэпы",
                submenu: [
                    {
                        label: "серийные",
                        href: ROUTES.TOP_CAPS
                    },
                    {
                        label: "на заказ",
                        href: ROUTES.TOP_CAPS
                    }
                ],
            },
            {
                label: "voile стрепы",
                href: ROUTES.VOILE_STRAP
            },
            {
                label: "кейджи",
                submenu: [
                    {
                        label: "малый",
                        href: ROUTES.CAGES
                    },
                    {
                        label: "плюсовой",
                        href: ROUTES.CAGES
                    },
                    {
                        label: "фронтальный",
                        href: ROUTES.CAGES
                    },
                    {
                        label: "объем",
                        href: ROUTES.CAGES
                    },
                ],
            },
            {
                label: "держатели фидбега",
                href: ROUTES.FEEDBAG_HANGER
            },
            {
                label: "размыкатель цепи",
                href: ROUTES.CHAIN_BREAKER
            },
        ]
    },
    {
        label: "разное",
        submenu: [
            {
                label: "щекотки и царапки",
                href: ROUTES.ITCHY_AND_SCRATCHY
            },
            {
                label: "мерч",
                href: ROUTES.MERCH
            },
            {
                label: "тест-райд",
                href: ROUTES.TEST_RIDE
            },
        ]
    },
    {
        label: "купить",
        href: ROUTES.BUY,
    }
]

export const useHeaderMenuOptions = () => {
    return menuOptions;
}
