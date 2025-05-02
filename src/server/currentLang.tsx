import { RequestEventBase } from "@builder.io/qwik-city";
import langService from "~/services/lang.service";
import { ILangType } from "~/types/lang";

export default function getCurrentLang(ev: RequestEventBase) {
    // Accept language
    const acceptLanguage = ev.request.headers.get("accept-language");
    // preferred
    const lang = (ev.params["lang"] || langService.getPreferredLanguage(acceptLanguage || "")) as ILangType;

    // Language instance
    return { lang: langService.getLangInfo(lang), langType: lang };
}