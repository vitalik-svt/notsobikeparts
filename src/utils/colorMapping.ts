/**
 * Maps UI-specific color values to warehouse color values.
 * UI-specific names (e.g., 'light-green') ensure no collisions in option dictionaries.
 * Warehouse names are the actual values in the warehouse JSON (cage-plus.json, etc.).
 */

export type CageUIColor = `black` | `aluminum`;
export type CagePlusUIColor = `black` | `transparent` | `light-green` | `light-brown`;
export type TopcapCustomUIColor = `black` | `aluminum` | `red` | `blue` | `green` | `purple` | `gold`;

export type WarehouseColor = `black` | `silver` | `green` | `brown` | `red` | `blue` | `purple` | `gold`;

export const cageColorToWarehouse: Record<CageUIColor, WarehouseColor> = {
    'black': `black`,
    'aluminum': `silver`,
};

export const cagePlusColorToWarehouse: Record<CagePlusUIColor, WarehouseColor> = {
    'black': `black`,
    'transparent': `silver`,
    'light-green': `green`,
    'light-brown': `brown`,
};

export const topcapCustomColorToWarehouse: Record<TopcapCustomUIColor, WarehouseColor> = {
    'black': `black`,
    'aluminum': `silver`,
    'red': `red`,
    'blue': `blue`,
    'green': `green`,
    'purple': `purple`,
    'gold': `gold`,
};

/**
 * Generic mapper for cage colors (handles both CageColor and CagePlusColor)
 */
export const mapCageColorToWarehouse = (uiColor: CageUIColor | CagePlusUIColor): WarehouseColor => {
    if (uiColor in cageColorToWarehouse) {
        return cageColorToWarehouse[uiColor as CageUIColor];
    }
    if (uiColor in cagePlusColorToWarehouse) {
        return cagePlusColorToWarehouse[uiColor as CagePlusUIColor];
    }
    return uiColor as unknown as WarehouseColor;
};
