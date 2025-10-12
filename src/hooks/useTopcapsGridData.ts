import { useTranslation } from "react-i18next";

interface TopcapItemRaw {
    description: string;
    image: string;
    isAvailable: boolean;
}
interface TopcapCategoryItemRaw {
    categoryName: string;
    items: TopcapItemRaw[];
}
interface TopcapItem extends TopcapItemRaw {
    id: string;
}

export interface TopcapCategoryItem {
    categoryName: string;
    items: TopcapItem[];
}

const baseUrl = `/images/topcaps/serial/items`;

export const useTopcapsGridData = () => {
    const { t } = useTranslation('topcaps');

    const topcapsRaw: TopcapCategoryItemRaw[] = [
        {
            categoryName: t(`topcaps.category.cyrillic`),
            items: [
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-1.avif`,
                    isAvailable: true
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-2.avif`,
                    isAvailable: false
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-3.avif`,
                    isAvailable: false
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-4.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-5.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-6.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-7.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-8.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-9.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-10.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-11.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-12.avif`,
                    isAvailable: true,
                },
                {
                    description: t(`topcaps.description.black`),
                    image: `${baseUrl}/product-pic-13.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-14.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-15.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-16.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-17.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-18.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-19.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-20.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-21.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-22.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-23.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-24.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-25.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-26.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-27.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-28.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-29.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-30.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-31.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-32.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-33.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-34.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-35.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-36.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-37.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-38.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-39.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-40.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-41.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-42.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-43.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-44.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-45.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-46.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-47.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-48.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-49.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-50.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-51.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-52.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-53.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-54.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-55.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-56.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-57.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-58.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-59.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-60.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-61.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-62.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-63.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-64.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-65.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-66.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-67.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-68.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-69.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-70.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-71.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-72.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-73.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-74.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-75.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-76.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-77.avif`,
                    isAvailable: true,
                },
            ]
        },
        {
            categoryName: t(`topcaps.category.latin`),
            items: [
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-301.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-302.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-303.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-304.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-305.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-306.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-307.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-308.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-309.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-310.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-311.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-312.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-313.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-314.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-315.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-316.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-317.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-318.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-319.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-320.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-321.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-322.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-323.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-324.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-325.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-326.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-327.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-328.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-329.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-330.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-331.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-332.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-333.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-334.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-335.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-336.avif`,
                    isAvailable: false,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-337.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-338.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-339.avif`,
                    isAvailable: true,
                },
                {
                    description: ``,
                    image: `${baseUrl}/product-pic-340.avif`,
                    isAvailable: true,
                },
            ],
        },
        {
            categoryName: t(`topcaps.category.collaborations`),
            items: [{
                description: t(`topcaps.description.401`),
                image: `${baseUrl}/product-pic-401.avif`,
                isAvailable: true,
            },
            {
                description: t(`topcaps.description.402`),
                image: `${baseUrl}/product-pic-402.avif`,
                isAvailable: true,
            },
            {
                description: t(`topcaps.description.403`),
                image: `${baseUrl}/product-pic-403.avif`,
                isAvailable: true,
            },
            ],
        },
        {
            categoryName: t(`topcaps.category.graphics`),
            items: [{
                description: t(`topcaps.description.1001`),
                image: `${baseUrl}/product-pic-1001.avif`,
                isAvailable: true,
            },
            {
                description: t(`topcaps.description.1002`),
                image: `${baseUrl}/product-pic-1002.avif`,
                isAvailable: true,
            },
            {
                description: t(`topcaps.description.1003`),
                image: `${baseUrl}/product-pic-1003.avif`,
                isAvailable: false,
            },
            {
                description: t(`topcaps.description.1004`),
                image: `${baseUrl}/product-pic-1004.avif`,
                isAvailable: false,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1005.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1006.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1007.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1008.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1009.avif`,
                isAvailable: false,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1010.avif`,
                isAvailable: false,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1011.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1012.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1013.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1014.avif`,
                isAvailable: true,
            },
            {
                description: t(`topcaps.description.black`),
                image: `${baseUrl}/product-pic-1015.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1016.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1017.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1018.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1019.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1020.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1021.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1022.avif`,
                isAvailable: false,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1023.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1024.avif`,
                isAvailable: true,
            },
            {
                description: ``,
                image: `${baseUrl}/product-pic-1025.avif`,
                isAvailable: true,
            },
            ],
        },
    ];

    const topcaps: TopcapCategoryItem[] = topcapsRaw.map(category => ({
        ...category,
        items: category.items.map((item, index) => ({
            ...item,
            id: `${category.categoryName.replace(/\s+/g, '-').toLowerCase()}-${index + 1}`
        }))
    }));

    return topcaps;
}