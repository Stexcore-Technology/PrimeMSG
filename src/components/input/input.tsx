import { component$, type IntrinsicHTMLElements, Slot, useStylesScoped$ } from "@builder.io/qwik";
import Box from "../box/box";

/**
 * Input props
 */
type IInputProps = IntrinsicHTMLElements["input"] & {
    /**
     * Label input
     */
    label?: string
    /**
     * text helper
     */
    textHelper?: string
    /**
     * Error boolean
     */
    error?: boolean
    /**
     * Valid boolean
     */
    valid?: boolean
};

/**
 * Input component
 */
export default component$((props: Omit<IInputProps, "children">) => {

    // Apply styles
    useStylesScoped$(/* css */`
        input {
            background: none;
            border: none;
            padding: 12px 12px 12px 12px;
            width: 100%;
            color: var(--text-color)
        }

        input:focus {
            outline: none;
        }

        input:-webkit-autofill, input:autofill, input:-internal-autofill-selected {
            background-color: none !important;
        }
        
        fieldset {
            background: transparent;
            border: 0.8px solid gray;
            border-radius: 3px;
            width: 100%;
            padding: 0;
            position: relative;
            border-color: var(--input-color);
            color: var(--input-color);
        }

        fieldset:focus-within {
            outline: none;
            border-color: var(--focus-color);
            color: var(--focus-color);
        }

        legend {
            margin: 0px 6px;
            font-size: 12px;
        }

        fieldset:focus-within legend {
            color: currentColor
        }

        .text-helper {
            position: absolute;
            top: 100%;
            margin-top: 2px;
            font-size: 8px;
            color: var(--helper-color)
        }

        .start:not(:empty) {
            margin: 10px
        }

        .start:not(:empty) ~ input {
            padding-left: 2px;
        }
    `);

    return (
        <fieldset style={{
            "--helper-color": props.error ? "tomato" : props.valid ? "mediumseagreen" : "var(--text-color)",
            "--focus-color": props.error ? "tomato" : props.valid ? "mediumseagreen" : "dodgerblue",
            "--input-color": props.error ? "tomato" : props.valid ? "mediumseagreen" : "inherit",
        }}>
            {props.label &&
                <legend>{props.label}</legend>
            }
            <Box display="flex" alignItems="center" justifyContent="center" mt={-6}>
                <div class="start">
                    <Slot name="start"></Slot>
                </div>
                <input {...props}></input>
            </Box>
            {props.textHelper && (
                <div class="text-helper">{props.textHelper}</div>
            )}
        </fieldset>
    );
});