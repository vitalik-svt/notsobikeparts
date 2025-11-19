/* eslint-disable @typescript-eslint/no-explicit-any */
import { CageSettings, useCagesProductData } from "./useCagesProductData";
import { ProductCageType } from "@/constants/productPrices";

export type ProductSectionData = {
    cage: Record<ProductCageType, CageSettings>;
    topcap: Record<string, any>; // замените на TopcapSettings когда определите
    voile: Record<string, any>;
    itchyAndScratchy: Record<string, any>;
    feedbagHanger: Record<string, any>;
    merch: Record<string, any>;
    chainBreaker: Record<string, any>;
};

export const useProductData = () => {
    const cages = useCagesProductData();

    const productData: ProductSectionData = {
        cage: cages,
        topcap: {},
        voile: {},
        itchyAndScratchy: {},
        feedbagHanger: {},
        merch: {},
        chainBreaker: {},
    };

    return productData;
}