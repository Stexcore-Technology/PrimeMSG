import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Input from "~/components/input/input";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import { component$ } from "@builder.io/qwik";
import { MailIcon, SecurityIcon, UserIcon } from "~/icons/icons";
import { useForm$ } from "~/hooks/useForm";
import { Form, Link, routeAction$, useNavigate, z, zod$ } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";

const schema = z.object({
    name: z.string()
        .min(4, "Se requiere mínimo 4 carácteres")
        .max(40, "Se requiere máximo 40 carácteres"),
    email: z.string()
        .min(1, "Campo requerido")
        .email("Debe ser un correo electrónico válido"),
    password: z.string()
        .min(8, "Se requiere mínimo 8 carácteres")
        .max(40, "Se requiere máximo 40 carácteres"),
    confirm_password: z.string()
        .min(8, "Se requiere mínimo 8 carácteres")
        .max(40, "Se requiere máximo 40 carácteres")
});

const useSignupAction = routeAction$(
    async (data, { url, fail, redirect }) => {
        try {
            await authService.createRequestToRegister(url.href, {
                username: data.name,
                email: data.email,
                password: data.password,
            });

            throw redirect(307, "/auth/signup/tcp-sended");
        }
        catch(err) {
            if(err instanceof authService.ExistsAccountError) {
                return fail(409, {
                    message: "Already exists another account"
                });
            }
            throw err;
        }
    }, 
    zod$(schema)
);

export default component$(() => {
    const navigate = useNavigate();
    const action = useSignupAction();
    const form = useForm$(schema, {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px" }}>
                <CardHeader style={{ textAlign: "center" }}>Registrate</CardHeader>
                <Divider></Divider>
                <CardContent>
                    <Form action={action} onSubmitCompleted$={() => {
                        if(action.status == 409) {
                            form.value.errors.email = "Another account is using this email";
                        }
                    }}>
                        <Box display="flex" flexDirection="column" gap={20}>
                            <Input 
                                type="text" 
                                name="name"
                                label="Nombre de usuario" 
                                placeholder="Carlos Cerdeño" 
                                value={form.value.values.name}
                                onInput$={form.value.handleChange}
                                onBlur$={form.value.handleBlur}
                                error={form.value.touched.name && !!form.value.errors.name}
                                valid={form.value.touched.name && !form.value.errors.name}
                                textHelper={form.value.touched.name && form.value.errors.name || ''}
                            >
                                <UserIcon q:slot="start"/>
                            </Input>
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
                            <Input 
                                type="password" 
                                name="confirm_password"
                                label="Confirmar contraseña" 
                                placeholder="Ingrese su contraseña de confirmación"
                                value={form.value.values.confirm_password}
                                onInput$={form.value.handleChange}
                                onBlur$={form.value.handleBlur}
                                error={form.value.touched.confirm_password && !!form.value.errors.confirm_password}
                                valid={form.value.touched.confirm_password && !form.value.errors.confirm_password}
                                textHelper={form.value.touched.confirm_password && form.value.errors.confirm_password || ''}
                            >
                                <SecurityIcon q:slot="start"></SecurityIcon>
                            </Input>
                            <Box mt={10} display="flex" flexDirection="column">
                                <Button type="submit" disabled={form.value.isInvalid || action.isRunning}>Crear cuenta</Button>
                            </Box>
                            <Box style={{textAlign: "center"}}>
                                ¿Ya tienes una cuenta? <Link href="../signin">Iniciar sesión</Link>
                            </Box>
                        </Box>
                    </Form>
                </CardContent>
            </Card>
        </Box>
    );
});