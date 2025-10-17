import Subtext from "../Subtext/Subtext";

interface Props {
    checked: boolean;
    onChange?: (value: boolean) => void;
    name: string;
    label: string;
    subtext?: string;
}

export default function Checkbox({ checked, onChange, name, label, subtext }: Props) {
    return (
        <label className="inline-flex flex-col cursor-pointer gap-2">
            <span className="flex gap-3 items-center">
                <input
                    type="checkbox"
                    className="peer hidden"
                    checked={checked}
                    onChange={(e) => onChange?.(e.target.checked)}
                    name={name}
                />
                <span
                    className="w-8 h-8 rounded border-2 border-gray-400 flex items-center justify-center flex-shrink-0 transition-colors peer-checked:border-black peer-checked:bg-black"
                >
                    <svg className="w-5 h-5 text-white opacity-100 peer-checked:opacity-0 transition-opacity" version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" fill="white"
                    >

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="white"
                            stroke="none">
                            <path fill="white" d="M4605 4386 c-105 -33 -109 -36 -1445 -1372 l-1315 -1314 -595 595
c-553 551 -600 596 -662 625 -159 74 -328 51 -454 -63 -100 -90 -149 -234
-125 -364 25 -134 9 -117 839 -944 726 -724 771 -767 832 -794 78 -34 185 -44
257 -25 122 33 70 -16 1629 1543 1614 1616 1522 1517 1547 1660 34 199 -91
392 -292 453 -56 17 -162 17 -216 0z"/>
                        </g>
                    </svg>

                </span>
                <span className="leading-tight">{label}</span>
            </span>
            {subtext && <Subtext>{subtext}</Subtext>}
        </label>
    );
}
