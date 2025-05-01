import { component$, noSerialize, NoSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Input from "~/components/input/input";
import Button from "~/components/button/button";
import { MailIcon, SecurityIcon } from "~/icons/icons";
import { useForm } from "~/hooks/useForm";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";
import useLang from "~/hooks/useLang";
import getCurrentLang from "~/server/currentLang";
import { ILang } from "~/types/lang";
import LangButton from "~/components/lang-button/lang-button";

/**
 * Schema zod
 */
const makeSchema = function(lang: { "@route-signin"?: ILang["@route-signin"] | undefined }) {
    return z.object({
        email: z.string()
            .min(1, lang["@route-signin"]?.form.email.validations.required)
            .email(lang["@route-signin"]?.form.email.validations.email),
        password: z.string()
            .min(8, lang["@route-signin"]?.form.password.validations.min)
            .max(40, lang["@route-signin"]?.form.password.validations.max)
    });
};

/**
 * User login action
 */
const useLoginAction = routeAction$(async (data, {cookie, redirect, fail}) => {
    try {
        // Get session
        const session = await authService.Login(data.email, data.password);

        // Set cookie session token
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
}, zod$((_, ev) => {
    const lang = getCurrentLang(ev);
    return makeSchema(lang);
}));

/**
 * Singin Page
 */
export default component$(() => {
    // User action
    const action = useLoginAction();
    const schema = useSignal<NoSerialize<ReturnType<typeof makeSchema>>>();
    const lang = useLang(["@route-signin"]);

    // Use form
    const form = useForm({ email: '', password: '' }, schema);

    useVisibleTask$(({track}) => {
        track(lang);

        schema.value = noSerialize(makeSchema(lang));
    });
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px" }}>
                <LangButton></LangButton>
                <CardHeader style={{ textAlign: "center" }}>{lang["@route-signin"]?.header}</CardHeader>
                <Divider></Divider>
                <CardContent>
                    <Form action={action} onSubmitCompleted$={() => {
                        if(action.value?.failed) {
                            form.value.values.password = '';
                            setTimeout(() => {
                                form.value.errors.email = lang["@route-signin"]?.form.email.validations.invalid_login
                            }, 100)
                        }
                    }}>
                        <Box display="flex" flexDirection="column" gap={20}>
                            <Input 
                                type="email" 
                                name="email"
                                label={lang["@route-signin"]?.form.email.label}
                                placeholder={lang["@route-signin"]?.form.email.placeholder}
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
                                label={lang["@route-signin"]?.form.password.label}
                                placeholder={lang["@route-signin"]?.form.password.placeholder}
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
                                <Button type="submit" disabled={form.value.isInvalid || action.isRunning}>
                                    {lang["@route-signin"]?.form.submit}
                                </Button>
                            </Box>
                            <Box style={{textAlign: "center"}}>
                                {lang["@route-signin"]?.footer.dont_account_question} <Link href="../signup">{lang["@route-signin"]?.footer.register_now}</Link>
                            </Box>
                        </Box>
                    </Form>
                </CardContent>
            </Card>
        </Box>
    );
});