export interface MenuItem {
    label: string;
    href?: string;
    submenu?: MenuItem[];
    hasCounter?: boolean;
    imageSrc?: string;
}