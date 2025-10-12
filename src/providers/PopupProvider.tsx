'use client';

import CloseButton from "@/components/CloseButton/CloseButton";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

function Popup({ children, onClose }: { children: ReactNode; onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-250 flex items-center justify-center bg-black/50">
            <div className="bg-white w-screen h-screen px-5 pt-20 pb-10 shadow-lg relative">
                <CloseButton 
                    onClick={onClose} 
                    withLabel={false}
                />
                {children}
            </div>
        </div>,
        document.body
    );
}

interface PopupContextType {
    open: (content: ReactNode) => void;
    close: () => void;
    isOpen: boolean;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function usePopup() {
    const ctx = useContext(PopupContext);
    if (!ctx) throw new Error("usePopup must be used within PopupProvider");
    return ctx;
}

export function PopupProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [content, setContent] = useState<ReactNode>(null);

    const open = (c: ReactNode) => {
        setContent(c);
        setIsOpen(true);
    };
    const close = () => setIsOpen(false);

    return (
        <PopupContext.Provider value={{ open, close, isOpen }}>
            {children}
            {isOpen && <Popup onClose={close}>{content}</Popup>}
        </PopupContext.Provider>
    );
}