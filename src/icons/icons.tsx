import { component$, JSXOutput } from "@builder.io/qwik";

interface IIconProps {
    size?: "sm" | "md" | "lg" | "xl" | "xxl",
    class?: string
}

function Icon({ size: sizeIcon = "lg", class: className }: IIconProps, callback: (size: number, className?: string) => JSXOutput) {
    const size = (
        sizeIcon === "sm" ? 10 :
        sizeIcon === "md" ? 16 :
        sizeIcon === "lg" ? 24 :
        sizeIcon === "xl" ? 32 :
        sizeIcon === "xxl" ? 48 : 62
    );
    
    return callback(size, className);
}

export const EyeIcon = component$<IIconProps>((props) => {
    return Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path d="M3.182 12.808C4.233 14.613 7.195 18.81 12 18.81c4.813 0 7.77-4.199 8.82-6.002a1.6 1.6 0 0 0-.001-1.615C19.769 9.389 16.809 5.19 12 5.19s-7.768 4.197-8.818 6.001a1.6 1.6 0 0 0 0 1.617Z" /><path d="M12 14.625a2.625 2.625 0 1 0 0-5.25a2.625 2.625 0 0 0 0 5.25Z" /></g></svg>
    ));
})

export const BackIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1"/></svg>
    ))
));

export const GithubIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
    ))
));

export const WhatsappIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
    ))
));

export const FacebookIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
    ))
));

export const MailIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"/></svg>
    ))
));

export const SecurityIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3" stroke-width={0.2} stroke="#d5d5d5"></path></svg>
    ))
));

export const UserIcon = component$<IIconProps>((props) => (
    Icon(props, (size, className) => (
        <svg xmlns="http://www.w3.org/2000/svg" class={className} width={size} height={size} viewBox="0 0 24 24"><circle cx={12} cy={6} r={4} fill="currentColor" stroke-width={0.2} stroke="#d5d5d5"></circle><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" stroke-width={0.2} stroke="#d5d5d5"></path></svg>
    ))
))