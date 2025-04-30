import { component$, useSignal, useStylesScoped$, JSXOutput } from "@builder.io/qwik";
import Box from "../box/box";

/**
 * Custom select
 */
type ICustomSelectProps = {
    /**
     * Label select
     */
    label?: string;
    /**
     * Options
     */
    options: {
        /**
         * Value
         */
        value: string; 
        /**
         * Label
         */
        label: string; 
        /**
         * Icon output
         */
        icon?: JSXOutput
    }[];
    /**
     * Text helper
     */
    textHelper?: string;
    /**
     * Error boolean
     */
    error?: boolean;
    /**
     * Valid boolean
     */
    valid?: boolean;
    /**
     * Default value
     */
    defaultValue?: string
};

/**
 * Select component
 */
export default component$((props: ICustomSelectProps) => {
    const isOpen = useSignal(false);
    const selectedOption = useSignal<string | null>(props.defaultValue ?? null);
    const firstOptionRef = useSignal<HTMLButtonElement>();
    const dropdownButtonRef = useSignal<HTMLButtonElement>();

    // Apply styles
    useStylesScoped$(/* css */`
        .dropdown {
            background: none;
            border: none;
            padding: 12px 12px;
            width: 100%;
            color: var(--text-color);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }

        .dropdown:focus {
            outline: none;
        }

        .menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #28264F;
            border-radius: 3px;
            margin-top: 4px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 10;
            display: none;
        }

        .menu.open {
            display: block;
        }

        .menu-item {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 12px;
            cursor: pointer;
            color: var(--text-color);
            background-color: transparent;
            border: none;
            transition: background-color 0.2s ease;
        }

        .menu-item:hover, .menu-item:focus {
            background-color: rgb(59, 56, 118);
            outline: none;
        }

        .fieldset {
            background: transparent;
            border: 0.8px solid gray;
            border-radius: 3px;
            padding: 0;
            position: relative;
            border-color: var(--input-color);
            color: var(--input-color);
        }

        .fieldset:focus-within {
            outline: none;
            border-color: var(--focus-color);
            color: var(--focus-color);
        }

        .legend {
            margin: 0px 6px;
            font-size: 12px;
        }

        .text-helper {
            position: absolute;
            top: 100%;
            margin-top: 2px;
            font-size: 8px;
            color: var(--helper-color);
        }
    `);

    return (
        <fieldset class="fieldset" style={{
            "--helper-color": props.error ? "tomato" : props.valid ? "mediumseagreen" : "var(--text-color)",
            "--focus-color": props.error ? "tomato" : props.valid ? "mediumseagreen" : "dodgerblue",
            "--input-color": props.error ? "tomato" : props.valid ? "mediumseagreen" : "inherit",
        }}>
            {props.label && (
                <legend class="legend">{props.label}</legend>
            )}
            <Box display="flex" alignItems="center" justifyContent="center" mt={-6}>
                <button
                    class="dropdown"
                    tabIndex={0}
                    ref={dropdownButtonRef}
                    onClick$={() => {
                        isOpen.value = !isOpen.value;
                        if (isOpen.value && firstOptionRef.value) {
                            setTimeout(() => firstOptionRef.value?.focus(), 0);
                        }
                    }}
                    onBlur$={(event) => {
                        const relatedTarget = event.relatedTarget as HTMLElement | null;
                        if (relatedTarget && relatedTarget.closest(".menu")) {
                            return;
                        }
                        isOpen.value = false;
                    }}
                >
                    <span>{selectedOption.value || "Selecciona una opción"}</span>
                    <span>&#9660;</span>
                </button>
                <div
                    class={`menu ${isOpen.value ? "open" : ""}`}
                    tabIndex={-1}
                >
                    {props.options.map((option, index) => (
                        <button
                            key={option.value}
                            ref={index === 0 ? firstOptionRef : undefined}
                            class="menu-item"
                            onClick$={() => {
                                selectedOption.value = option.label;
                                isOpen.value = false;

                                setTimeout(() => dropdownButtonRef.value?.focus(), 0);
                            }}
                        >
                            {option.icon}
                            {option.label}
                        </button>
                    ))}
                </div>
            </Box>
            {props.textHelper && (
                <div class="text-helper">{props.textHelper}</div>
            )}
        </fieldset>
    );
});
