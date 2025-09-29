import { useTranslation } from "react-i18next";

export const useCagesProductData = () => {
    const { t } = useTranslation('cages');


    const cages = {
        front: {
            name: t(`front.name`),
            description: t(`front.description`),
            features: [
                t(`front.features.1`),
                t(`front.features.2`),
                t(`front.features.3`),
                t(`front.features.4`),
                t(`front.features.5`)
            ]
        }

    }
    
    return cages;
}