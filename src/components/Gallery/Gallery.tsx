"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
import NavButton from './NavButton/NavButton';
import CloseButton from './CloseButton/CloseButton';

interface Props {
    images: string[];
}

export default function Gallery({ images }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSlideShowModeOn, setIsSlideShowModeOn] = useState(false);

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

    const mainContentWrapperClasses = isSlideShowModeOn
        ? "fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center p-8"
        : "w-[568px] max-w-[320px] lg:max-w-none mx-auto";

    const mainSliderClasses = isSlideShowModeOn
        ? "keen-slider max-h-[90vh] w-auto max-w-none rounded"
        : "keen-slider h-[368px] w-full max-w-lg shrink-0 bg-gray-700 rounded";

    const mainSliderImageClasses = isSlideShowModeOn
        ? "keen-slider__slide h-full object-contain"
        : "keen-slider__slide w-[568px] h-full object-cover cursor-zoom-in";

    const thumbsSliderClasses = isSlideShowModeOn
        ? "hidden"
        : "keen-slider mt-4 flex gap-2 justify-center flex-wrap";

    const openSlideShowMode = () => {
        setIsSlideShowModeOn(true);
        setTimeout(() => {
            instanceRef.current?.update();
            thumbsInstanceRef.current?.update();
        }, 100);
    };

    const goToPrevSlide = () => instanceRef.current?.prev();
    const goToNextSlide = () => instanceRef.current?.next();
    const closeSlideShowMode = () => {
        setIsSlideShowModeOn(false);

        setTimeout(() => {
            instanceRef.current?.update();
            thumbsInstanceRef.current?.update();
        }, 0);
    }

    return (
        <div className={mainContentWrapperClasses}>
            {isSlideShowModeOn && (
                <>
                    <NavButton direction="prev" onClick={goToPrevSlide} />
                    <NavButton direction="next" onClick={goToNextSlide} />
                    <CloseButton onClick={closeSlideShowMode} />
                </>
            )}


            <div ref={sliderRef} className={mainSliderClasses}>
                {images.map((src, idx) => (
                    <Image
                        key={idx}
                        className={mainSliderImageClasses}
                        src={src}
                        alt=""
                        width={568}
                        height={200}
                        priority={idx === 0}
                        onClick={openSlideShowMode}
                    />
                ))}
            </div>
            <div ref={thumbsRef} className={thumbsSliderClasses}>
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
            <div className={isSlideShowModeOn ? 'text-white pt-5 text-xl' : 'hidden'}>
                {currentSlide + 1} / {images.length}
            </div>
        </div>
    );
}   
