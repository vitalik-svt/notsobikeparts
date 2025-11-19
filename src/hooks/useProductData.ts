/* eslint-disable @typescript-eslint/no-explicit-any */
import { CageSettings, useCagesProductData } from "./useCagesProductData";
import { ProductCageType } from "@/constants/productPrices";
import { useTopcapsData, UseTopcapsDataResult } from "./useTopcapsData";
import { useVoileProductData } from "./useVoileProductData";

export type ProductSectionData = {
    cage: Record<ProductCageType, CageSettings>;
    topcap: UseTopcapsDataResult;
    voile: Record<string, any>;
    itchyAndScratchy: Record<string, any>;
    feedbagHanger: Record<string, any>;
    merch: Record<string, any>;
    chainBreaker: Record<string, any>;
};

export const useProductData = () => {
    const cage = useCagesProductData();
    const topcap = useTopcapsData();
    const voile = useVoileProductData()

    const productData: ProductSectionData = {
        cage,
        topcap,
        voile,
        itchyAndScratchy: {},
        feedbagHanger: {},
        merch: {},
        chainBreaker: {},
    };

    return productData;
}