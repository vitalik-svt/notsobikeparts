import { useEffect, useRef } from "react";

export function useKeyPress(targetKey: string, callback: () => void) {
    const callbackRef = useRef(callback);
    // Update ref to latest callback on every render
    callbackRef.current = callback;

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === targetKey) {
                event.preventDefault();
                callbackRef.current();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [targetKey]);
}