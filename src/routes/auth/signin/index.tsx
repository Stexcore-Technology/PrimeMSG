import { component$ } from "@builder.io/qwik";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Input from "~/components/input/input";
import Button from "~/components/button/button";
import { MailIcon, SecurityIcon } from "~/icons/icons";
import { useForm$ } from "~/hooks/useForm";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";

const schema = z.object({
    email: z.string()
        .min(1, "Campo requerido")
        .email("Debe ser un correo electrónico válido"),
    password: z.string()
        .min(8, "Se requiere mínimo 8 carácteres")
        .max(40, "Se requiere máximo 40 carácteres")
});

const useLoginAction = routeAction$(async (data, {cookie, redirect, fail}) => {
    try {
        const session = await authService.Login(data.email, data.password);

        // Cookie session
        cookie.set("TOKEN_SESSION", session.token, { path: "/" });
        
        throw redirect(307, "/dashboard");
    }
    catch(err) {
        if(err instanceof authService.UserNotFoundError) {
            return fail(404, {
                message: "Usuario y/o clave inválida",
            });
        }
        else throw err;
    }
}, zod$(schema));

export default component$(() => {
    // User action
    const action = useLoginAction();

    // Use form
    const form = useForm$(schema, {
        email: '',
        password: ''
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px" }}>
                <CardHeader style={{ textAlign: "center" }}>Iniciar Sesión</CardHeader>
                <Divider></Divider>
                <CardContent>
                    <Form action={action} onSubmitCompleted$={() => {
                        if(action.value?.failed) {
                            form.value.values.password = '';
                            setTimeout(() => {
                                form.value.errors.email = "Usuario y/o clave invalida!"
                            }, 100)
                        }
                    }}>
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
                                <Button type="submit" disabled={form.value.isInvalid || action.isRunning}>Iniciar sesión</Button>
                            </Box>
                            <Box style={{textAlign: "center"}}>
                                ¿No tienes una cuenta? <Link href="../signup">Regístrate</Link>
                            </Box>
                        </Box>
                    </Form>
                </CardContent>
            </Card>
        </Box>
    );
});