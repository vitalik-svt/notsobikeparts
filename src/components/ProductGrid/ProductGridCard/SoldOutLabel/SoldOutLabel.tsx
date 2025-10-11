import { PropsWithChildren } from "react";

export default function SoldOutLabel({ children }: PropsWithChildren) {
    return (
        <p className="absolute top-0 left-0 w-full h-full bg-gray-100/85 flex justify-center items-center uppercase pb-10 tracking-wider">
            <span className='text-sm border-2 px-2 py-1 bg-white/40 rounded border-red-600 text-red-600 md:text-lg'>
                {children}
            </span>
        </p>
    );
}