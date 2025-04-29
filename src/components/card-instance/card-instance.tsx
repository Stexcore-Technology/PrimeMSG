import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { IInstance } from "~/models/instance.model";

/**
 * Card instance componente
 */
export default component$((props: IInstance) => {

    // Apply styles
    useStylesScoped$(/*ccs*/`
        .card {
            border: 1px solid gray;
        }
    `);
    
    return (
        <div class="card">
            {props.name}
        </div>
    );
});