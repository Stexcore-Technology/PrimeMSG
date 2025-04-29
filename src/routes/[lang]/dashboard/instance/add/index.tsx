import { component$, useSignal } from "@builder.io/qwik";
import Box from "~/components/box/box";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import Input from "~/components/input/input";
import Select from "~/components/select/select";
import Swiper, { SwiperSlide } from "~/components/swiper/swiper";
import { SmsIcon, TelegramIcon, WhatsappIcon } from "~/icons/icons";

export default component$(() => {
    const index = useSignal(0);

    return (
        <Swiper currentIndex={index.value} gap={40}>
            <SwiperSlide>
                <Card>
                    <CardHeader>Agregar instancia</CardHeader>
                    <CardContent>
                        <Box display="flex" flexDirection="column" gap={15}>
                            <Input
                                type="text"
                                label="Nombre instancia"
                            ></Input>
                            <Select
                                label="Plataforma"
                                options={[
                                    {
                                        label: "Whatsapp",
                                        value: "whatsapp",
                                        icon: <WhatsappIcon></WhatsappIcon>
                                    },
                                    {
                                        label: "Telegram",
                                        value: "telegram",
                                        icon: <TelegramIcon></TelegramIcon>
                                    },
                                    {
                                        label: "Mensajería SMS",
                                        value: "sms",
                                        icon: <SmsIcon></SmsIcon>
                                    }
                                ]}
                            ></Select>
                            <Box style={{ textAlign: "right" }}>
                                <Button style={{ minWidth: "200px" }} onClick$={() => index.value = 1}>
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </SwiperSlide>
            <SwiperSlide>
                <Card>
                    <CardHeader>Agregar instancia</CardHeader>
                    <CardContent>
                        <Box display="flex" flexDirection="column" gap={15}>
                            <Input
                                type="text"
                                label="Nombre instancia"
                            ></Input>
                            <Select
                                label="Plataforma"
                                options={[
                                    {
                                        label: "Whatsapp",
                                        value: "whatsapp",
                                        icon: <WhatsappIcon></WhatsappIcon>
                                    },
                                    {
                                        label: "Telegram",
                                        value: "telegram",
                                        icon: <TelegramIcon></TelegramIcon>
                                    },
                                    {
                                        label: "Mensajería SMS",
                                        value: "sms",
                                        icon: <SmsIcon></SmsIcon>
                                    }
                                ]}
                            ></Select>
                            <Box style={{ textAlign: "right" }}>
                                <Button style={{ minWidth: "200px" }} onClick$={() => index.value = 1}>
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </SwiperSlide>
        </Swiper>
    );
});