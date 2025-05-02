import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import useSidebarMenu, { ISidebarMenu, ISidebarMenuGroup, ISidebarMenuItem, ISidebarMenuSeparator } from "~/hooks/useSidebarMenu";
import Divider from "../divider/divider";

/**
 * Menu item component
 */
const MenuItem = component$((props: ISidebarMenuItem) => {
    const location = useLocation();
    const style = useStylesScoped$(/*css*/`
        
        .link {
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
            background: transparent;
            border: none;
            width: 100%;
            padding: 10px 40px;
            text-decoration: none;
            color: var(--text-color)
        }

        .link:hover, .link:focus {
            background: rgba(255,255,255,0.1);
            cursor: pointer;
            outline: none;
        }

        .link.active {
            color: dodgerblue;
        }

        .link.active::before {
            content: " ";
            position: absolute;
            display: block;
            left: -5px;
            width: 10px;
            height: 10px;
            background: dodgerblue;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 2px dodgerblue;
        }
    `);
    
    return (
        <Link href={props.href} class={[style.scopeId, "link", {active: location.url.pathname == props.href}]}>
            {props.icon}
            {props.label}
        </Link>
    )
});

/**
 * Separator component
 */
const SeparatorItem = component$((props: ISidebarMenuSeparator) => {
    return (
        <Divider></Divider>
    );
});

/**
 * Group component
 */
const GroupItem = component$((props: ISidebarMenuGroup) => {
    return (
        <div>
            {props.submenu.map((menuItem) => (
                <Item key={menuItem.id} {...menuItem}></Item>
            ))}
        </div>
    );
});

/**
 * Item component
 */
const Item = component$((props: ISidebarMenu) => {
    switch(props.type) {

        // Menu item
        case "menu":
            return <MenuItem {...props}></MenuItem>

        // Group item
        case "group":
            return <GroupItem {...props}></GroupItem>

        // Separator
        case "separator":
            return <SeparatorItem {...props}></SeparatorItem>

        default:
            throw new Error("Unknow Type Sidebar Menu");
    }
});

/**
 * Sidebar component
 */
export default component$(() => {
    // Menu options
    const menu = useSidebarMenu();

    return (
        <div>
            {menu.value.map((menuItem) => (
                <Item key={menuItem.id} {...menuItem}></Item>
            ))}
        </div>
    );
});