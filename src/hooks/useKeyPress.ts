import { useEffect } from "react";

export function useKeyPress(targetKey: string, callback: () => void) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === targetKey) {
                callback();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [targetKey, callback]);
}