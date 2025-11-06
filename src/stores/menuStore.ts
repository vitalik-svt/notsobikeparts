import { create } from "zustand";

interface Store {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

export const menuStore = create<Store>()(
    (set) => ({
        menuOpen: false,
        setMenuOpen: (open) => set({ menuOpen: open }),
    })
);
