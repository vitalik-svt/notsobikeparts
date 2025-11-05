'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    itemTitle: string;
    durationMs: number;
}

export default function Notification({ itemTitle, durationMs }: Props) {
    const { t } = useTranslation();

    const [widthPercent, setWidthPercent] = useState(100);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // enter animation: slide in from right
        const raf = requestAnimationFrame(() => {
            // small delay so transition applies
            setTimeout(() => setIsVisible(true), 8);
            // start progress bar shrink slightly later so it's visible on enter
            setTimeout(() => setWidthPercent(0), 16);
        });

        // start closing after durationMs
        const closeTimer = window.setTimeout(() => {
            setIsClosing(true);
        }, durationMs);

        // optional: fully hide/remove after exit animation (duration 500ms here)
        const removeTimer = window.setTimeout(() => {
            setIsVisible(false);
        }, durationMs + 500);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(closeTimer);
            clearTimeout(removeTimer);
        };
    }, [durationMs]);

    const transformClasses = isClosing
        ? "-translate-y-[120%] opacity-0 duration-500"
        : isVisible
            ? "translate-x-0 opacity-100 duration-300"
            : "translate-x-full opacity-0 duration-300";

    return (
        <article className={`flex gap-3 items-center border-2 px-5 py-4 rounded-sm bg-white relative min-w-[350px] max-w-sm shadow-md overflow-hidden transform transition-all ${transformClasses}`}>
            <Image
                src={`/icons/checkmark.webp`}
                alt=""
                width={40}
                height={40}
            />
            <h3>
                {t(`success.added_to_cart`, { itemTitle })}
            </h3>
            <span
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(100 - widthPercent)}
                className="absolute left-0 bottom-0 h-1 bg-black rounded-tr-sm rounded-br-sm"
                style={{
                    width: `${widthPercent}%`,
                    transition: `width ${durationMs}ms linear`,
                }}
            />
        </article>
    )
}