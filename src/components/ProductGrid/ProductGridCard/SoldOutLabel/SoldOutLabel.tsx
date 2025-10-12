import { PropsWithChildren } from "react";

export default function SoldOutLabel({ children }: PropsWithChildren) {
    return (
        <p className="w-full flex justify-center items-center uppercase">
            <span className='text-sm px-2 py-1 rounded tracking-widest md:text-lg text-gray-500'>
                {children}
            </span>
        </p>
    );
}