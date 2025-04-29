import { component$, HTMLAttributes, Slot, useStylesScoped$ } from "@builder.io/qwik";

/**
 * Card content
 */
export const CardContent = component$((props: HTMLAttributes<HTMLDivElement>) => {

    // Append styles
    useStylesScoped$(`
        div {
            padding: 10px;
        }
    `);

    return (
        <div {...props}>
            <Slot></Slot>
        </div>
    );
});

/**
 * Card header
 */
export const CardHeader = component$((props: HTMLAttributes<HTMLDivElement>) => {

    // Append styles
    useStylesScoped$(`
        h2 {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            margin: 0;
            font-size: 25px;
        }    
    `);

    return (
        <h2 {...props}>
            <Slot></Slot>
        </h2>
    );
})

/**
 * Card component
 */
export default component$((props: HTMLAttributes<HTMLDivElement>) => {

    // Append styles
    useStylesScoped$(/*css*/`
        div {
            padding: 10px;
            border-radius: 5px;
            background-color: #28264F;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.1)
        }
    `);
    
    return (
        <div {...props}>
            <Slot></Slot>
        </div>
    );
});