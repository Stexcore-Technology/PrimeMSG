import { component$, type HTMLAttributes, useStylesScoped$ } from "@builder.io/qwik";

/**
 * Divider component
 */
export default component$((props: HTMLAttributes<HTMLElement>) => {

    // Load styles
    useStylesScoped$(`
        div {
            width: 100%;
            height: 1px;
            background-color: rgb(78, 78, 78);
            margin: 10px 0px;
        }    
    `);
    
    return (
        <div {...props}></div>
    );
});