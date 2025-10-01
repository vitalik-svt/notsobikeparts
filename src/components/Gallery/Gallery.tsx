"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";

interface Props {
    images: string[];
}

export default function Gallery({ images }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        loop: true,
    });
    
    const [thumbsRef, thumbsInstanceRef] = useKeenSlider({
        initial: 0,
        slides: { perView: images.length <= 9 ? 9 : images.length },
        mode: "snap",
        rubberband: false,
        loop: true,
    });

    useEffect(() => {
        requestAnimationFrame(() => {
            instanceRef.current?.update();
            thumbsInstanceRef.current?.update();
        });
    }, [instanceRef, thumbsInstanceRef]);

    useEffect(() => {
        const handleResize = () => {
            instanceRef.current?.update();
            thumbsInstanceRef.current?.update();
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [instanceRef, thumbsInstanceRef]);

    const handleThumbClick = (idx: number) => {
        instanceRef.current?.moveToIdx(idx);
    };

    return (
        <div className='w-[568px] max-w-[320px] lg:max-w-none mx-auto'>
            <div ref={sliderRef} className="keen-slider h-[368px] w-full max-w-lg shrink-0 bg-gray-700 rounded">
                {images.map((src, idx) => (
                    <Image
                        key={idx}
                        className="keen-slider__slide w-[568px] h-full object-cover"
                        src={src}
                        alt=""
                        width={568}
                        height={200}
                        priority={idx === 0}
                    />
                ))}
            </div>
            <div ref={thumbsRef} className="keen-slider mt-4 flex gap-2 justify-center flex-wrap">
                {images.map((src, idx) => (
                    <button
                        key={idx}
                        className={`keen-slider__slide border-2 w-40 ${currentSlide === idx ? "border-black" : "border-transparent opacity-50"} rounded flex-shrink-0`}
                        onClick={() => handleThumbClick(idx)}
                        tabIndex={0}
                        type="button"
                    >
                        <Image
                            src={src}
                            alt=""
                            width={60}
                            height={60}
                            className="flex w-40 object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}   
