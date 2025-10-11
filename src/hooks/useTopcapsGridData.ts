import { useTranslation } from "react-i18next";

interface TopcapItemRaw {
    description: string,
    image: string,
    isAvailable: boolean,
    category: string,
}

export interface TopcapItem extends TopcapItemRaw {
    id: number;
}

function groupBy<T, K extends string | number | symbol>(
    array: T[],
    getKey: (item: T) => K
): Record<K, T[]> {
    return array.reduce((acc, item) => {
        const key = getKey(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<K, T[]>);
}

const baseUrl = `/images/topcaps/serial/items`;


export const useTopcapsGridData = () => {
    const { t } = useTranslation('topcaps');


    const topcapsRaw: TopcapItemRaw[] = [
        {
            description: ``,
            image: `${baseUrl}/product-pic-1.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-2.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-3.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-4.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-5.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-6.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-7.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        ////
        {
            description: ``,
            image: `${baseUrl}/product-pic-301.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-302.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-303.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-304.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-305.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-306.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-307.avif`,
            isAvailable: true,
            category: t(`topcaps.category.2`)
        },

        ////
        {
            description: t(`topcaps.description.401`),
            image: `${baseUrl}/product-pic-401.avif`,
            isAvailable: true,
            category: t(`topcaps.category.3`)
        },
        {
            description: t(`topcaps.description.402`),
            image: `${baseUrl}/product-pic-402.avif`,
            isAvailable: true,
            category: t(`topcaps.category.3`)
        },
        {
            description: t(`topcaps.description.403`),
            image: `${baseUrl}/product-pic-403.avif`,
            isAvailable: true,
            category: t(`topcaps.category.3`)
        },
        ////
        {
            description: t(`topcaps.description.1001`),
            image: `${baseUrl}/product-pic-1001.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`)
        },
        {
            description: t(`topcaps.description.1002`),
            image: `${baseUrl}/product-pic-1002.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`)
        },
        {
            description: t(`topcaps.description.1003`),
            image: `${baseUrl}/product-pic-1003.avif`,
            isAvailable: false,
            category: t(`topcaps.category.4`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1004.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1005.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1006.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1007.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1008.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1009.avif`,
            isAvailable: false,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1010.avif`,
            isAvailable: false,
            category: t(`topcaps.category.4`),
        },
    ];


    const topcaps: TopcapItem[][] = Object.values(
        groupBy(topcapsRaw, item => item.category)
    ).map((group) =>
        group ? group.map((item, idx) => ({
            ...item,
            id: idx + 1,
        })) : []
    );

    return topcaps;
}