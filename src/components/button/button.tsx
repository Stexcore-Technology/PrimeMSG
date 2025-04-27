import { component$, IntrinsicElements, Slot, useStylesScoped$ } from "@builder.io/qwik";

export default component$((props: IntrinsicElements["button"]) => {

    useStylesScoped$(/* css */`
        button {
            background: white;
            color: black;
            border-radius: 3px;
            border: none;
            padding: 10px;
        }

        button:not(:disabled) {
            cursor: pointer;
        }

        button:hover:not(:disabled) {
            background: #f0f0f0;
        }

        button:active:not(:disabled) {
            background: #c0c0c0;
        }

        button:disabled {
            opacity: 0.4;
        }
    `);

    return (
        <button {...props}>
            <Slot></Slot>
        </button>
    );
});