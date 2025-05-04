import { component$, type JSX, useComputed$ } from "@builder.io/qwik";

interface RichTextProps {
  text: string;
  replacements?: Record<string, JSX.Element>;
}

// Función para escapar caracteres especiales y que la regex funcione bien
const escapeRegex = (str: string) =>
  str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

export default component$(({ text, replacements = {} }: RichTextProps) => {
  
  const segments = useComputed$(() => {
    const replacementKeys = Object.keys(replacements)
    .map((key) => `(${escapeRegex(key)})`)
    .join("|");
  
    const regex = new RegExp(`(\\*[^*]+\\*)|${replacementKeys}`, "g");
    return text.split(regex).filter((segment: string) => segment !== "");
  });
  

  const parsed = segments.value.map((segment, index) => {
    if (typeof segment === "string" && segment.startsWith("*") && segment.endsWith("*")) {
      return <strong key={segment + "-" + index}>{segment.slice(1, -1)}</strong>;
    } else if (replacements[segment]) {
      return <span key={segment + "-" + index} style={{verticalAlign: "middle"}}>{replacements[segment]}</span>;
    }
    return segment;
  });

  return <>{parsed}</>;
});
