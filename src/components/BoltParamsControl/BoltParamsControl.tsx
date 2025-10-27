import { BoltColor, BoltMaterial } from "@/stores/cartStore";
import SegmentedControl from "../SegmentedControl/SegmentedControl";
import { useTranslation } from "react-i18next";
import Subtext from "../Subtext/Subtext";
import Radio from "../Radio/Radio";

type BoltParamsUpdate =
  | { boltsMaterial: BoltMaterial }
  | { boltColor: BoltColor | null };

interface Props {
    boltPrice: string;
    boltsMaterial: BoltMaterial;
    boltColor: BoltColor | null;
    setProductParams: (params: BoltParamsUpdate) => void;
}

export const BoltParamsControl = ({ boltPrice, boltsMaterial, boltColor, setProductParams }: Props) => {
    const { t } = useTranslation();
    
    const options: { label: string; value: BoltMaterial }[] = [
        { label: t(`product.topcap.option.none`), value: 'none' },
        { label: `${t(`product.topcap.option.titanium`)} (+${boltPrice})`, value: 'titanium' },
        { label: t(`product.topcap.option.steel`), value: 'steel' },
    ];

    const radioOptions: { label: string; value: BoltColor }[] = [
        { label: t('product.topcap.bolt.color.black'), value: 'black' },
        { label: t('product.topcap.bolt.color.light'), value: 'light' },
    ];

    return (
        <div className='flex flex-col gap-2'>
            <SegmentedControl
                options={options}
                onChange={(value: BoltMaterial) => setProductParams({ boltsMaterial: value })}
                value={boltsMaterial}
            />

            {boltsMaterial === 'none' ? (
                <Subtext>{t('product.topcap.annotation')}</Subtext>
            ) : (
                <div className='pt-1 pb-3 xl:pt-2 xl:pb-4'>
                    <Radio
                        options={radioOptions}
                        value={boltColor}
                        onChange={(value) => setProductParams({ boltColor: value })}
                    />
                </div>
            )}
        </div>
    );
}