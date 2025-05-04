import { type JSXOutput, type Signal, useComputed$ } from "@builder.io/qwik";
import { AddIcon, ApiIcon, DashboardIcon, InstanceIcon } from "~/icons/icons";
import useLang from "./useLang";

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
    label?: string,
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
    const lang = useLang(["@layout-dashboard"]);

    const SidebarMenu: Signal<ISidebarMenu[]> = useComputed$(() => {
        
        const menuData: ISidebarMenu[] = [
            {
                id: "@dashboard",
                type: "menu",
                label: lang["@layout-dashboard"]?.sidebar.dashboard,
                href: `/dashboard/`,
                icon: <DashboardIcon></DashboardIcon>
            },
            {
                id: "@add-instance",
                type: "menu",
                label: lang["@layout-dashboard"]?.sidebar.add_instance,
                href: "/dashboard/instance/add/",
                icon: <AddIcon></AddIcon>
            },
            {
                id: "@instances",
                type: "menu",
                label: lang["@layout-dashboard"]?.sidebar.instances,
                href: "/dashboard/instance/",
                icon: <InstanceIcon></InstanceIcon>
            },
            {
                id: "@docs",
                type: "menu",
                label: lang["@layout-dashboard"]?.sidebar.docs,
                href: "/docs/",
                icon: <ApiIcon></ApiIcon>
            }
        ];

        const mapItem = (item: ISidebarMenu): ISidebarMenu => {
            switch(item.type) {
                case "group":
                    return {
                        ...item,
                        submenu: item.submenu.map(mapItem)
                    };

                case "menu":
                    return {
                        ...item,
                        href: "/" + lang.langType + "/" + item.href.replace(/^\/+/, "")
                    };

                default:
                    return item;
            }
        }
        
        return menuData.map(mapItem);
    });

    return SidebarMenu;
}