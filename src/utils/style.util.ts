import { CSSProperties } from "@builder.io/qwik";

export default {
    // utils/styleParser.ts
    parse: (style: undefined | string | CSSProperties): CSSProperties | undefined => {
        if(style) {
            let styleObj: { [key: string]: string } = {};
        
            if(typeof style === "string") {
                style.split(';').forEach((rule) => {
                    const [key, value] = rule.split(':');
                    if (key && value) {
                        styleObj[key.trim()] = value.trim();
                    }
                });
            }
            else styleObj = style as any;
            
            return styleObj;
        }
        return undefined;
    }
  
}