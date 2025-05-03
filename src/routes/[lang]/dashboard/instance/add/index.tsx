import { component$, useSignal } from "@builder.io/qwik";
import Box from "~/components/box/box";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import CreateWhatsapp from "~/components/create-whatsapp/create-whatsapp";
import Input from "~/components/input/input";
import Select from "~/components/select/select";
import Swiper, { SwiperSlide } from "~/components/swiper/swiper";
import useLang from "~/hooks/useLang";
import { SmsIcon, TelegramIcon, WhatsappIcon } from "~/icons/icons";

export default component$(() => {
    const index = useSignal(0);
    const lang = useLang(["@route-add-instance"]);

    return (
        <Swiper currentIndex={index.value} gap={40}>
            <SwiperSlide>
                <Card>
                    <CardHeader>{lang["@route-add-instance"]?.steps.initial.header}</CardHeader>
                    <CardContent>
                        <Box display="flex" flexDirection="column" gap={15}>
                            <Input
                                type="text"
                                label={lang["@route-add-instance"]?.steps.initial.form.instance_name.label}
                                placeholder={lang["@route-add-instance"]?.steps.initial.form.instance_name.placeholder}
                            ></Input>
                            <Select
                                label="Plataforma"
                                options={[
                                    {
                                        label: lang["@route-add-instance"]?.steps.initial.form.platform.options.whatsapp || "",
                                        value: "whatsapp",
                                        icon: <WhatsappIcon></WhatsappIcon>
                                    },
                                    {
                                        label: lang["@route-add-instance"]?.steps.initial.form.platform.options.telegram || "",
                                        value: "telegram",
                                        icon: <TelegramIcon></TelegramIcon>
                                    },
                                    {
                                        label: lang["@route-add-instance"]?.steps.initial.form.platform.options.sms || "",
                                        value: "sms",
                                        icon: <SmsIcon></SmsIcon>
                                    }
                                ]}
                            ></Select>
                            <Box style={{ textAlign: "right" }}>
                                <Button style={{ minWidth: "200px" }} onClick$={() => index.value = 1}>
                                    {lang["@route-add-instance"]?.steps.initial.form.next}
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </SwiperSlide>
            <SwiperSlide>
            <Card>
            <CardHeader>{lang["@route-add-instance"]?.steps.sync_whatsapp.header}</CardHeader>
            <CardContent>
                <Box display="flex" flexDirection="column" gap={15}>
                    <CreateWhatsapp></CreateWhatsapp>
                    
                    <Box display="flex" justifyContent="space-between">
                        <Button style={{ minWidth: "200px" }} onClick$={() => index.value = 0}>
                            {lang["@route-add-instance"]?.steps.sync_whatsapp.back}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
            </SwiperSlide>
        </Swiper>
    );
});