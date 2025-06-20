import type { RequestHandler } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";
import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import { component$, isDev } from "@builder.io/qwik";
import { CheckFillIcon } from "~/icons/icons";
import { Link } from "@builder.io/qwik-city";
import { RedirectMessage, ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import getCurrentLang from "~/server/currentLang";
import useLang from "~/hooks/useLang";
import httpService from "~/services/http.service";

/**
 * Validate if error is a ServerError
 * @param err Error instance
 */
function isServerError(err: unknown): err is ServerError {
    return (
      err instanceof ServerError ||
      // This is required for dev environments due to an issue with vite: https://github.com/vitejs/vite/issues/3910
      (isDev && err instanceof Error && err.constructor.name === "ServerError")
    );
  }
   
/**
 * Validate if error if a RedirectMessage
 * @param err Error instance
 */
  function isRedirectMessage(err: unknown): err is RedirectMessage {
    return (
      err instanceof RedirectMessage ||
      // This is required for dev environments due to an issue with vite: https://github.com/vitejs/vite/issues/3910
      (isDev && err instanceof Error && err.constructor.name === "RedirectMessage")
    );
  }

/**
 * Validate TCP token
 */
export const onGet: RequestHandler = async (ev) => {
    try {
        const { langType } = getCurrentLang(ev);
        // Get session
        const session = await authService.AuthorizeRegisterByToken(ev.params.tcp);
        
        // Set token session
        ev.cookie.set("TOKEN_SESSION", session.data.data.token, { path: "/" });
        
        // Proceed with your logic now that validation is successful
        throw ev.redirect(308, `/${langType}/dashboard`);
    }
    catch(err) {
        // Validate is expired session
        const isExpired = err instanceof httpService.RequestError && err.statusCode === 401;
        
        if(!isExpired) {
            // Validate server Error
            if(isServerError(err)) {
                throw err;
            }

            // Validate Redirect Error
            if(isRedirectMessage(err)) {
                throw err;
            }

            if(isDev) {
                throw err;
            }
            else throw new ServerError(500, "Internal server error");
        }
    }
};

/**
 * TCP Expired Page
 */
export default component$(() => {
    const lang = useLang(["@route-signup-tcp-expired"]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px", "max-width": "500px" }}>
                <CardHeader style={{ justifyContent: "center" }}>
                    <CheckFillIcon size="xl" styles={{ color: "red" }}></CheckFillIcon>
                    {lang["@route-signup-tcp-expired"]?.header}
                </CardHeader>
                <Divider></Divider>
                <CardContent>
                    <p style="text-align: center">
                        {lang["@route-signup-tcp-expired"]?.text}
                    </p>
                    <Box mt={40} display="flex" justifyContent="center">
                        <Link href={`/${lang}/auth/signin`}>
                            <Button type="button" style={{ "min-width": "250px" }}>{lang["@route-signup-tcp-expired"]?.button}</Button>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
});

