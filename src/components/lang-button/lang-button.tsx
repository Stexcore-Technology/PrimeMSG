import { component$, useContext } from "@builder.io/qwik";
import useLang from "~/hooks/useLang";
import { ILangType } from "~/types/lang";
import Select from "../select/select";
import langContext from "~/contexts/lang.context";

export default component$(() => {
    const context = useContext(langContext);

    console.log(
        JSON.stringify(context.langType)
    )
    
    return (
        <Select
            defaultValue={context.langType}
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