import { JSXOutput } from "@builder.io/qwik";
import { AddIcon, ApiIcon, DashboardIcon, InstanceIcon } from "~/icons/icons";

/**
 * Sidebar menu item
 */
export interface ISidebarMenuItem {
    /**
     * Identifier
     */
    id: string,
    /**
     * Type menu
     */
    type: "menu",
    /**
     * Label menu
     */
    label: string,
    /**
     * Link href
     */
    href: string,
    /**
     * Icon JSX
     */
    icon?: JSXOutput
}

/**
 * Sidebar group
 */
export interface ISidebarMenuGroup {
    /**
     * Identifier
     */
    id: string,
    /**
     * Type group
     */
    type: "group",
    /**
     * Label menu
     */
    label: string,
    /**
     * Items of group
     */
    submenu: ISidebarMenu[]
}

/**
 * Sidebar menu separator
 */
export interface ISidebarMenuSeparator {
    /**
     * Menu identifier
     */
    id: string,
    /**
     * Type group
     */
    type: "separator"
    /**
     * Label menu
     */
    label: string
}

/**
 * Sidebar menu
 */
export type ISidebarMenu = 
    | ISidebarMenuItem
    | ISidebarMenuGroup
    | ISidebarMenuSeparator;


/**
 * Get menu items sidebars
 * @returns List menu items
 */
export default function useSidebarMenu() {
    const SidebarMenu: ISidebarMenu[] = [
        {
            id: "@dashboard",
            type: "menu",
            label: "Panel de control",
            href: "/dashboard/",
            icon: <DashboardIcon></DashboardIcon>
        },
        {
            id: "@add-instance",
            type: "menu",
            label: "Agregar instancia",
            href: "/dashboard/instance/add/",
            icon: <AddIcon></AddIcon>
        },
        {
            id: "@instances",
            type: "menu",
            label: "Instancias",
            href: "/dashboard/instance/",
            icon: <InstanceIcon></InstanceIcon>
        },
        {
            id: "@docs",
            type: "menu",
            label: "Documentación",
            href: "/docs/",
            icon: <ApiIcon></ApiIcon>
        }
    ];

    return SidebarMenu;
}