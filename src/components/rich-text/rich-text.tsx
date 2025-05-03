import { component$, JSX, useComputed$ } from "@builder.io/qwik";

interface RichTextProps {
  text: string;
  replacements?: Record<string, JSX.Element>;
}

// Función para escapar caracteres especiales y que la regex funcione bien
const escapeRegex = (str: string) =>
  str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

export default component$(({ text, replacements = {} }: RichTextProps) => {
  // Crear regex mejorada con reemplazos escapados
  const replacementKeys = Object.keys(replacements)
    .map((key) => `(${escapeRegex(key)})`)
    .join("|");
  
  const regex = new RegExp(`(\\*[^*]+\\*)|${replacementKeys}`, "g");

  const parsedText = useComputed$(() => {
    const segments = text.split(regex).filter((segment) => segment !== undefined && segment !== "");

    return segments.map((segment, index) => {
      if (typeof segment === "string" && segment.startsWith("*") && segment.endsWith("*")) {
        return <strong key={segment + "-" + index}>{segment.slice(1, -1)}</strong>;
      } else if (replacements[segment]) {
        return <span key={segment + "-" + index} style={{verticalAlign: "middle"}}>{replacements[segment]}</span>;
      }
      return <span>{segment}</span>;
    });
  });

  return <>{parsedText}</>;
});
