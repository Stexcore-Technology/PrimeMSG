import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Input from "~/components/input/input";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import { component$, noSerialize, NoSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { MailIcon, SecurityIcon, UserIcon } from "~/icons/icons";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";
import { ILang } from "~/types/lang";
import getCurrentLang from "~/server/currentLang";
import { useForm } from "~/hooks/useForm";
import useLang from "~/hooks/useLang";

/**
 * Schema object
 */
const makeSchema = function(lang: { "@route-signup"?: ILang["@route-signup"] | undefined }) {
    return z.object({
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
};

/**
 * Send TCP code to email to validate new account
 */
const useSignupAction = routeAction$(
    async (data, ev) => {
        try {
            const { langType } = getCurrentLang(ev);

            await authService.createRequestToRegister(ev.url.href, {
                username: data.name,
                email: data.email,
                password: data.password,
                langType: langType
            });

            throw ev.redirect(307, `/${langType}/auth/signup/tcp-sended`);
        }
        catch(err) {
            if(err instanceof authService.ExistsAccountError) {
                return ev.fail(409, {
                    message: "Already exists another account"
                });
            }
            throw err;
        }
    }, 
    zod$((_, ev) => {
        const { lang } = getCurrentLang(ev);
        return makeSchema(lang);
    })
);

/**
 * Signup Page
 */
export default component$(() => {
    const action = useSignupAction();
    const schema = useSignal<NoSerialize<ReturnType<typeof makeSchema>>>();
    const lang = useLang(["@route-signup"]);

    const form = useForm({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    }, schema);

    useVisibleTask$(({track}) => {
        track(lang);
        schema.value = noSerialize(makeSchema(lang));
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px" }}>
                <CardHeader style={{ textAlign: "center" }}>
                    {lang["@route-signup"]?.header}
                </CardHeader>
                <Divider></Divider>
                <CardContent>
                    <Form action={action} onSubmitCompleted$={() => {
                        if(action.status == 409) {
                            form.value.errors.email = lang["@route-signup"]?.form.email.validations.another_account;
                        }
                    }}>
                        <Box display="flex" flexDirection="column" gap={20}>
                            <Input 
                                type="text" 
                                name="name"
                                label={lang["@route-signup"]?.form.username.label}
                                placeholder={lang["@route-signup"]?.form.username.placeholder}
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
                                label={lang["@route-signup"]?.form.email.label}
                                placeholder={lang["@route-signup"]?.form.email.placeholder}
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
                                label={lang["@route-signup"]?.form.password.label}
                                placeholder={lang["@route-signup"]?.form.password.placeholder}
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
                                label={lang["@route-signup"]?.form.password.label}
                                placeholder={lang["@route-signup"]?.form.password.placeholder}
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
                                <Button type="submit" disabled={form.value.isInvalid || action.isRunning}>{lang["@route-signup"]?.form.submit}</Button>
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