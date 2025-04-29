import { createContextId, QRL, Signal } from "@builder.io/qwik";
import { ILang, ILangType } from "~/types/lang";

type IloadLang<T extends keyof ILang> = (lang: T) => void;

export interface IContextLang {
    langType: ILangType
    loadSegmentLang: QRL<(segments: (keyof ILang)[]) => Promise<{ [key in keyof ILang]?: ILang[key] }>>
    activeLang: Signal<{ [key in keyof ILang]?: ILang[key] }>,
    changeLang: QRL<(lang: ILangType) => void>
}

export default createContextId<IContextLang>("prime.msg.lang.context");