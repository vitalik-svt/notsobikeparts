import { useTranslation } from "react-i18next";

interface TopcapItemRaw {
    description: string,
    image: string,
    isAvailable: boolean,
    category: string,
}

export interface TopcapItem extends TopcapItemRaw {
    id: string;
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
        {
            description: ``,
            image: `${baseUrl}/product-pic-8.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-9.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-10.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-11.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-12.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: t(`topcaps.description.black`),
            image: `${baseUrl}/product-pic-13.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-14.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-15.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-16.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-17.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-18.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-19.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-20.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-21.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-22.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-23.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-24.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-25.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-26.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-27.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-28.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-29.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-30.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-31.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-32.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-33.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-34.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-35.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-36.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-37.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-38.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-39.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-40.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-41.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-42.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-43.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-44.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-45.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-46.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-47.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-48.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-49.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-50.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-51.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-52.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-53.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-54.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-55.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-56.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-57.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-58.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-59.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-60.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-61.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-62.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-63.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-64.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-65.avif`,
            isAvailable: true,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-66.avif`,
            isAvailable: false,
            category: t(`topcaps.category.1`)
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-67.avif`,
            isAvailable: false,
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
            description: t(`topcaps.description.1004`),
            image: `${baseUrl}/product-pic-1004.avif`,
            isAvailable: false,
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
        {
            description: ``,
            image: `${baseUrl}/product-pic-1011.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1012.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1013.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1014.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: t(`topcaps.description.black`),
            image: `${baseUrl}/product-pic-1015.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1016.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1017.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1018.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1019.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1020.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1021.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1022.avif`,
            isAvailable: false,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1023.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1024.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
        {
            description: ``,
            image: `${baseUrl}/product-pic-1025.avif`,
            isAvailable: true,
            category: t(`topcaps.category.4`),
        },
    ];


    const topcaps: TopcapItem[][] = Object.values(
        groupBy(topcapsRaw, item => item.category)
    ).map((group) =>
        group.map((item, idx) => ({
            ...item,
            id: `${item.category}-${idx}`,
        }))
    );

    return topcaps;
}