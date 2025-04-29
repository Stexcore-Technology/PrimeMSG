import { createContextId } from "@builder.io/qwik";

interface IThemeContext {
    colors: {
        primary: string,
        secondary: string,
        error: string,
    }
}

export const themeContext = createContextId("prime.msg.theme.context");
