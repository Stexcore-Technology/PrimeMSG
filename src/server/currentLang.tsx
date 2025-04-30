import { RequestEventBase } from "@builder.io/qwik-city";
import langService from "~/services/lang.service";
import { ILangType } from "~/types/lang";

export default function getCurrentLang({request, params}: { params: RequestEventBase["params"], request: RequestEventBase["request"] }) {
    // Accept language
    const acceptLanguage = request.headers.get("accept-language");
    // preferred
    const lang = (params["lang"] || langService.getPreferredLanguage(acceptLanguage || "")) as ILangType;

    // Language instance
    return langService.getLangInfo(lang);
}