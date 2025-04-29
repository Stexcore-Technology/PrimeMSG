import { JSXOutput } from "@builder.io/qwik";
import { AddIcon, ApiIcon, DashboardIcon, InstanceIcon } from "~/icons/icons";

export interface ISidebarMenuItem {
    id: string,
    type: "menu",
    label: string,
    href: string,
    icon?: JSXOutput
}

export interface ISidebarMenuGroup {
    id: string,
    type: "group",
    label: string,
    submenu: ISidebarMenu[]
}

export interface ISidebarMenuSeparator {
    id: string,
    type: "separator"
    label: string
}

export type ISidebarMenu = 
    | ISidebarMenuItem
    | ISidebarMenuGroup
    | ISidebarMenuSeparator;


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