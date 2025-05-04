import { component$ } from "@builder.io/qwik";
import useLang from "~/hooks/useLang";
import type { ILang } from "~/types/lang";
import Select from "../select/select";
import { useLocation } from "@builder.io/qwik-city";
import ImgEs from "../../../public/icons/es.png?jsx";
import ImgEn from "../../../public/icons/en.png?jsx";

export default component$(() => {
    const location = useLocation();
    const lang = useLang(["@component-lang-button"]);
    
    return (
        <Select
            label={lang["@component-lang-button"]}
            defaultValue={location.params.lang}
            onSelect$={(value) => lang.changeLang(value as keyof ILang)}
            options={[
                {
                    value: "es",
                    label: "Español",
                    icon: <ImgEs style={{width:16, height:16}}></ImgEs>
                },
                {
                    value: "en",
                    label: "Inglés",
                    icon: <ImgEn style={{width:16, height:16}}></ImgEn>
                }
            ]}
        >
        </Select>
    );
});