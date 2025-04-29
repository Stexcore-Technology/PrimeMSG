import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { IInstance } from "~/models/instance.model";

export default component$((props: IInstance) => {
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