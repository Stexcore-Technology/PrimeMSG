import { component$ } from "@builder.io/qwik";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Input from "~/components/input/input";
import Button from "~/components/button/button";
import { MailIcon, SecurityIcon } from "~/icons/icons";
import { useForm$ } from "~/hooks/useForm";
import { z } from "@builder.io/qwik-city";

export default component$(() => {

    // Use form
    const form = useForm$(
        z.object({
            email: z.string()
                .min(1, "Campo requerido")
                .email("Debe ser un correo electrónico válido"),
            password: z.string()
                .min(8, "Se requiere mínimo 8 carácteres")
                .max(40, "Se requiere máximo 40 carácteres")
        }), {
            email: '',
            password: ''
        }
    );

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px" }}>
                <CardHeader style={{ textAlign: "center" }}>Iniciar Sesión</CardHeader>
                <Divider></Divider>
                <CardContent>
                    <form>
                        <Box display="flex" flexDirection="column" gap={20}>
                            <Input 
                                type="email" 
                                name="email"
                                label="Correo electrónico" 
                                placeholder="usuario@stexcore.com" 
                                value={form.value.values.email}
                                onInput$={form.value.handleChange}
                                onBlur$={form.value.handleBlur}
                                error={form.value.touched.email && !!form.value.errors.email}
                                valid={form.value.touched.email && !form.value.errors.email}
                                textHelper={form.value.touched.email && form.value.errors.email || ''}
                            >
                                <MailIcon q:slot="start"/>
                            </Input>
                            <Input 
                                type="password" 
                                name="password"
                                label="Contraseña" 
                                placeholder="Ingrese su contraseña"
                                value={form.value.values.password}
                                onInput$={form.value.handleChange}
                                onBlur$={form.value.handleBlur}
                                error={form.value.touched.password && !!form.value.errors.password}
                                valid={form.value.touched.password && !form.value.errors.password}
                                textHelper={form.value.touched.password && form.value.errors.password || ''}
                            >
                                <SecurityIcon q:slot="start"></SecurityIcon>
                            </Input>
                            <Box mt={10} display="flex" flexDirection="column">
                                <Button disabled={form.value.isInvalid}>Iniciar sesión</Button>
                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
});