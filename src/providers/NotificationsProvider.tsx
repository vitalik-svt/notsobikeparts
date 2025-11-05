'use client';

import Notifications from "@/components/Notifications/Notifications";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface NotificationsContextType {
    setNotification: (content: string) => void;
}

const durationMs = 3000;

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function useNotifications() {
    const ctx = useContext(NotificationsContext);

    if (!ctx) {
        throw new Error("useNotifications must be used within NotificationsProvider");
    }

    return ctx;
}

export function NotificationsProvider({ children }: PropsWithChildren) {
    const [items, setItems] = useState<string[]>([]);

    const setNotification = (content: string) => {
        setItems(prev => [...prev, content]);
    };

    useEffect(() => {
        if (items.length === 0) return;

        const timer = window.setTimeout(() => {
            setItems(prev => prev.slice(1));
        }, durationMs + 500);

        return () => clearTimeout(timer);
    }, [items]);

    return (
        <NotificationsContext.Provider value={{ setNotification }}>
            {children}
            {items.length > 0 && <Notifications items={items} durationMs={durationMs} />}
        </NotificationsContext.Provider>
    );
}