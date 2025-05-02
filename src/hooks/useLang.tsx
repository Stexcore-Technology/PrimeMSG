import { $, QRL, useComputed$, useStore, useTask$ } from "@builder.io/qwik";
import { RequestEventBase, server$, useLocation, useNavigate } from "@builder.io/qwik-city";
import langService from "~/services/lang.service";
import { ILang, ILangType } from "~/types/lang";

const loadLangSegments = server$(function (this: RequestEventBase, lang: ILangType, segments: (keyof ILang)[]) {
    // Get lang info
    const langInfo = langService.getLangInfo(lang);
    // Initialize segments
    const langSegment: { [key in keyof ILang]?: ILang[key] } = {};
    
    // Load segments into server
    segments.forEach((segmentItem) => {
        langSegment[segmentItem] = langInfo[segmentItem] as any;
    });

    return langSegment;
});

export default function useLang<T extends keyof ILang>(segments: T[]): {[key in T]?: ILang[key]} & {
    changeLang: QRL<(newLang: keyof ILang) => void>,
    langType: ILangType
} {
    const navigate = useNavigate();
    const location = useLocation();
    const langType = useComputed$(() => {
        return location.params.lang as ILangType;
    });
    const data = useStore({
        changeLang: $((newLang: keyof ILang) => {
            navigate(location.url.href.replace(`/${location.params.lang}/`, `/${newLang}/`));
        }),
        langType: langType.value
    } as {[key in T]: ILang[key]} & {
        changeLang: QRL<(newLang: keyof ILang) => void>,
        langType: ILangType
    });

    useTask$(async ({track}) => {
        track(langType);
        track(() => segments.toString());

        const segmentsData = await loadLangSegments(langType.value, segments);

        for(const key in segmentsData) {
            data[key as T] = segmentsData[key as T] as any;
        }

        data.langType = langType.value;
    });
    
    return data;
}