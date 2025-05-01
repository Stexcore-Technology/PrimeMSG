import { component$, useContext } from "@builder.io/qwik";
import useLang from "~/hooks/useLang";
import { ILang, ILangType } from "~/types/lang";
import Select from "../select/select";
import { useLocation } from "@builder.io/qwik-city";

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
                    icon: <img width={16} height={16} src="/icons/es.png"></img>
                },
                {
                    value: "en",
                    label: "Inglés",
                    icon: <img width={16} height={16} src="/icons/en.png"></img>
                }
            ]}
        >
        </Select>
    );
});