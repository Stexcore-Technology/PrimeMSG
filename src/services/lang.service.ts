import { ILang, ILangType } from "~/types/lang";
import lang_en from "../lang/en";
import lang_es from "../lang/es";

export default new class LangService {

    constructor() { }

    /**
     * Get lang information
     * @param lang Lang
     * @returns Lang info
     */
    public getLangInfo(lang: ILangType): ILang {
        switch(lang) {
            case "en":
                return lang_en;

            case "es":
                return lang_es;

            default:
                throw new Error("Unknow lang '" + lang + "'");
        }
    }

    public getPreferredLanguage(acceptLanguage: string): string {
        if (!acceptLanguage) return "en"; // Idioma predeterminado
      
        // Dividir el encabezado en idiomas y prioridades
        const languages = acceptLanguage.split(",").map((lang) => {
          const [language, q] = lang.split(";q=");
          return { language: language.trim()?.split("-")?.[0]?.toLocaleLowerCase(), priority: parseFloat(q) || 1 };
        });
      
        // Ordenar por prioridad descendente
        languages.sort((a, b) => b.priority - a.priority);
      
        // Retornar solo el idioma principal
        return languages[0]?.language || "en";
    }
    
}