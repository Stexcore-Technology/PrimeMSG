import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Box from "../box/box";
import useLang from "~/hooks/useLang";
import RichText from "../rich-text/rich-text";
import { IosSettingsIcon, MenuVerticalIcon } from "~/icons/icons";
import Qrcode from "../qrcode/qrcode";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    const lang = useLang(["@component-create-whatsapp"]);

    const { scopeId } = useStylesScoped$(/*css*/`
        ol {
            margin: 0;
            padding: 0;
            padding-left: 20px;
        }

        ol li {
            margin: 0px 15px 15px 15px;
            padding-left: 10px
        }

        .icon-box {
            display: inline-block; 
            border: 1px solid #454659; 
            border-radius: 8px; 
            background: #443e67;
        }
    `);

    const replacements = {
        "$menu": (
            <Box class={[scopeId, "icon-box"]} p={5}>
                <MenuVerticalIcon size="md"></MenuVerticalIcon>
            </Box>
        ),
        "$settings": (
            <Box class={[scopeId, "icon-box"]} p={5}>
                <IosSettingsIcon size="md"></IosSettingsIcon>
            </Box>
        )
    };

    return (
        <Box display="flex" gap={20}>
            <Box style={{flex: 1}}>
                <p>
                    {lang["@component-create-whatsapp"]?.details}
                </p>
                <Box>
                    <ol>
                        <li>
                            <RichText text={lang["@component-create-whatsapp"]?.help_steps.step1 || ""}/>
                        </li>
                        <li>
                            <RichText text={lang["@component-create-whatsapp"]?.help_steps.step2 || ""} replacements={replacements}/>
                        </li>
                        <li>
                            <RichText text={lang["@component-create-whatsapp"]?.help_steps.step3 || ""}/>
                        </li>
                        <li>
                            <RichText text={lang["@component-create-whatsapp"]?.help_steps.step4 || ""}/>
                        </li>
                    </ol>
                </Box>
                <Box mb={30}>
                    <Link href={`https://faq.whatsapp.com/1317564962315842/?cms_platform=web&lang=${lang.langType}`}>
                        {lang["@component-create-whatsapp"]?.need_help_question}
                    </Link>
                </Box>
            </Box>
            <Box>
                <Qrcode value="https://stexcore.com" size={220}></Qrcode>
            </Box>
        </Box>
    )
});