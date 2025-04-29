import { $, component$, Slot, useComputed$, useContextProvider, useStore, useTask$ } from "@builder.io/qwik";
import { RequestEventBase, server$, useLocation, useNavigate } from "@builder.io/qwik-city";
import langContext, { IContextLang } from "~/contexts/lang.context";
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

export default component$(() => {
    const location = useLocation();
    const navigate = useNavigate();

    const lang = useStore<{
        [langType in ILangType]?: {
            [key in keyof ILang]?: ILang[key]
        }
    }>({});

    const langType = useComputed$(() => {
        return location.params.lang as ILangType;
    });

    const loadSegmentLang = $(async (segments: (keyof ILang)[]) => {
        const langCache = lang[langType.value] = lang[langType.value] || {};
        const needToLoadSegments: (keyof ILang)[] = [];
        const resultLang: { [key in keyof ILang]?: ILang[key] } = {};

        new Set(segments).forEach((segmentItem) => {
            if(langCache[segmentItem]) {
                resultLang[segmentItem] = langCache[segmentItem] as any;
            }
            else needToLoadSegments.push(segmentItem);
        });

        if(needToLoadSegments.length) {
            const loaded = await loadLangSegments(langType.value, needToLoadSegments);

            for(const key in loaded) {
                if(loaded[key as keyof ILang]) {
                    resultLang[key as keyof ILang] = loaded[key as keyof ILang] as any;
                }
            }
        }

        return resultLang;
    });

    const changeLang = $((newLang: ILangType) => {
        navigate(location.url.href.replace(`/${location.params.lang}/`, `/${newLang}/`));
    });

    const activeLang = useComputed$(() => {
        return lang[langType.value];
    });

    // Provider context lang
    useContextProvider(langContext, {
        changeLang,
        loadSegmentLang,
        activeLang: activeLang,
        langType: langType.value
    });
    
    return (
        <Slot></Slot>
    );
});