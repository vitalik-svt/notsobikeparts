'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

function Popup({ children, onClose }: { children: ReactNode; onClose: () => void }) {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded shadow-lg relative">
                <button
                    className="absolute top-2 right-2"
                    onClick={onClose}
                    aria-label="Close"
                >✕</button>
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
    const [isOpen, setIsOpen] = useState(false);
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