import { component$, HTMLAttributes, Slot, useStylesScoped$ } from "@builder.io/qwik";

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

export const CardHeader = component$((props: HTMLAttributes<HTMLDivElement>) => {
    // Append styles
    useStylesScoped$(`
        h2 {
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

export default component$((props: HTMLAttributes<HTMLDivElement>) => {
    // Append styles
    useStylesScoped$(`
        div {
            padding: 10px;
            border-radius: 5px;
            background-color: rgb(26, 24, 33);
        }
    `);
    
    return (
        <div {...props}>
            <Slot></Slot>
        </div>
    );
});