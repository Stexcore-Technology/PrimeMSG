import { component$, Slot, useContextProvider, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Sidebar from "~/components/sidebar/sidebar";
import { UserContext } from "~/contexts/user.context";
import loadSession from "~/server/loadSession";

/**
 * Load current session
 */
export const useUser = routeLoader$(async ({ cookie, redirect }) => {
    return loadSession(cookie, redirect);
});

/**
 * Layout dashboard
 */
export default component$(() => {
    // User instance
    const user = useUser();

    // Provider data
    useContextProvider(UserContext, user.value);

    // Apply styles
    useStylesScoped$(/* css */`
        .layout {
            display: flex;
            height: 100vh;
        }

        .sidebar {
            flex: 1;
            max-width: 300px;
            background: rgba(255,255,255,0.04)
        }

        .content {
            flex: 1;
            padding-top: 20px
        }
    `);
    
    return (
        <div class="layout">
            <div class="sidebar">
                <Sidebar></Sidebar>
            </div>
            <div class="content">
                <Slot></Slot>
            </div>
        </div>
    );
});