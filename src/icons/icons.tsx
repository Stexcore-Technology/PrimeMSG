import { component$, CSSProperties, JSXOutput } from "@builder.io/qwik";

/**
 * Icon props
 */
interface IIconProps {
    /**
     * Size
     */
    size?: "sm" | "md" | "lg" | "xl" | "xxl",
    /**
     * Class icon
     */
    class?: string
    /**
     * Styles properties
     */
    styles?: CSSProperties
}

/**
 * Icon callback
 * @param callback Callback to render JSX
 */
function Icon({ size: sizeIcon = "lg", class: className, styles }: IIconProps, callback: (props: {width: number, height: number, class?: string, style?: CSSProperties}) => JSXOutput) {

    // Get size icon
    const size = (
        sizeIcon === "sm" ? 10 :
        sizeIcon === "md" ? 16 :
        sizeIcon === "lg" ? 24 :
        sizeIcon === "xl" ? 32 :
        sizeIcon === "xxl" ? 48 : 62
    );
    
    /**
     * Render component
     */
    return callback({
        width: size,
        height: size,
        class: className, 
        style: styles
    });
}

/**
 * Eye Icon
 */
export const EyeIcon = component$<IIconProps>((props) => {
    return Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path d="M3.182 12.808C4.233 14.613 7.195 18.81 12 18.81c4.813 0 7.77-4.199 8.82-6.002a1.6 1.6 0 0 0-.001-1.615C19.769 9.389 16.809 5.19 12 5.19s-7.768 4.197-8.818 6.001a1.6 1.6 0 0 0 0 1.617Z" /><path d="M12 14.625a2.625 2.625 0 1 0 0-5.25a2.625 2.625 0 0 0 0 5.25Z" /></g></svg>
    ));
})

/**
 * Back Icon
 */
export const BackIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1"/></svg>
    ))
));

/**
 * Github Icon
 */
export const GithubIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
    ))
));

/**
 * Whatsapp Icon
 */
export const WhatsappIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
    ))
));

/**
 * Facebook Icon
 */
export const FacebookIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
    ))
));

/**
 * Mail Icon
 */
export const MailIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"/></svg>
    ))
));

/**
 * Security Icon
 */
export const SecurityIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3" stroke-width={0.2} stroke="#d5d5d5"></path></svg>
    ))
));

/**
 * User Icon
 */
export const UserIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><circle cx={12} cy={6} r={4} fill="currentColor" stroke-width={0.2} stroke="#d5d5d5"></circle><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" stroke-width={0.2} stroke="#d5d5d5"></path></svg>
    ))
))

/**
 * Check Fill Icon
 */
export const CheckFillIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clip-rule="evenodd" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Dashboard Icon
 */
export const DashboardIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M14 9q-.425 0-.712-.288T13 8V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9zM4 13q-.425 0-.712-.288T3 12V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13zm10 8q-.425 0-.712-.288T13 20v-8q0-.425.288-.712T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21zM4 21q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21z" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Add Icon
 */
export const AddIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22m0-13.75a.75.75 0 0 1 .75.75v2.25H15a.75.75 0 0 1 0 1.5h-2.25V15a.75.75 0 0 1-1.5 0v-2.25H9a.75.75 0 0 1 0-1.5h2.25V9a.75.75 0 0 1 .75-.75" clip-rule="evenodd" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Instance Icon
 */
export const InstanceIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.464 3.464c-1.08 1.08-1.363 2.647-1.438 5.286h19.948c-.075-2.64-.358-4.205-1.439-5.286C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464M2 12q0-.934.003-1.75H8.25v11.706c-2.34-.097-3.775-.41-4.786-1.42C2 19.07 2 16.714 2 12m4-5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clip-rule="evenodd" stroke-width="0.2" stroke="#d5d5d5"/><path fill="currentColor" d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22c-.819 0-1.566 0-2.25-.008V10.25h12.247Q22 11.066 22 12" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Api Icon
 */
export const ApiIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        // <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/><path d="M6 13.5L7.5 9l1.875 4.5M6 13.5L5.5 15m.5-1.5h3.375m0 0L10 15m2.5-3V9.7c0-.186 0-.28.024-.355a.5.5 0 0 1 .322-.32C12.92 9 13.013 9 13.2 9h1.3a1.5 1.5 0 0 1 0 3zm0 0v3m6-6v6"/></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M13.26 10.5h2v1h-2z" stroke-width="0.2" stroke="#d5d5d5"/><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8.4 15L8 13.77H6.06L5.62 15H4l2.2-6h1.62L10 15Zm8.36-3.5a1.47 1.47 0 0 1-1.5 1.5h-2v2h-1.5V9h3.5a1.47 1.47 0 0 1 1.5 1.5ZM20 15h-1.5V9H20Z" stroke-width="0.2" stroke="#d5d5d5"/><path fill="currentColor" d="M6.43 12.77h1.16l-.58-1.59z" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Telegram Icon
 */
export const TelegramIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        // <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/><path d="M6 13.5L7.5 9l1.875 4.5M6 13.5L5.5 15m.5-1.5h3.375m0 0L10 15m2.5-3V9.7c0-.186 0-.28.024-.355a.5.5 0 0 1 .322-.32C12.92 9 13.013 9 13.2 9h1.3a1.5 1.5 0 0 1 0 3zm0 0v3m6-6v6"/></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Sms Icon
 */
export const SmsIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        // <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/><path d="M6 13.5L7.5 9l1.875 4.5M6 13.5L5.5 15m.5-1.5h3.375m0 0L10 15m2.5-3V9.7c0-.186 0-.28.024-.355a.5.5 0 0 1 .322-.32C12.92 9 13.013 9 13.2 9h1.3a1.5 1.5 0 0 1 0 3zm0 0v3m6-6v6"/></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 26 26"><path fill="currentColor" d="M23 4H3C1.3 4 0 5.3 0 7v12c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3m.8 15.4L16 13.8l-3 2l-3.1-2l-7.7 5.6l6.3-6.5l-7.7-6L13 13.5L25.1 7l-7.6 6z" stroke-width="0.2" stroke="#d5d5d5"/></svg>
    ))
))

/**
 * Menu vertical Icon
 */
export const MenuVerticalIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 21 21"><g fill="currentColor" fill-rule="evenodd" stroke-width="0.2" stroke="#d5d5d5"><circle cx="10.5" cy="10.5" r="1"/><circle cx="10.5" cy="5.5" r="1"/><circle cx="10.5" cy="15.5" r="1"/></g></svg>
    ))
))

/**
 * Ios settings Icon
 */
export const IosSettingsIcon = component$<IIconProps>((props) => (
    Icon(props, (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m6-6h-6M9 6.803L12 12m0 0l-3 5.197"/><path stroke-dasharray="1 3" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/><path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/></g></svg>
    ))
))