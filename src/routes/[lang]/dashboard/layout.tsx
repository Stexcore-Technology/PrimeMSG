import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import Sidebar from "~/components/sidebar/sidebar";

/**
 * Layout dashboard
 */
export default component$(() => {

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