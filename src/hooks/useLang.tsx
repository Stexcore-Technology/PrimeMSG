import { useContext, useStore, useTask$ } from "@builder.io/qwik";
import langContext from "~/contexts/lang.context";
import { ILang } from "~/types/lang";

export default function useLang<T extends keyof ILang>(segments: T[]): {[key in T]?: ILang[key]} {
    const context = useContext(langContext);
    const data = useStore({} as {[key in T]: ILang[key]});

    useTask$(async ({track}) => {
        track(() => context.langType);
        track(() => segments.toString());

        const segmentsData = await context.loadSegmentLang(segments);

        for(const key in segmentsData) {
            data[key as T] = segmentsData[key as T] as any;
        }
    });

    useTask$(({track}) => {
        track(context.activeLang);

        for(const key in context.activeLang.value) {
            data[key as T] = context.activeLang.value[key as T] as any;
        }
    });
    
    return data;
}