import { RequestHandler } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";
import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import { component$, isDev } from "@builder.io/qwik";
import { CheckFillIcon } from "~/icons/icons";
import { Link } from "@builder.io/qwik-city";
import { RedirectMessage, ServerError } from "@builder.io/qwik-city/middleware/request-handler";

function isServerError(err: unknown): err is ServerError {
    return (
      err instanceof ServerError ||
      // This is required for dev environments due to an issue with vite: https://github.com/vitejs/vite/issues/3910
      (isDev && err instanceof Error && err.constructor.name === "ServerError")
    );
  }
   
  function isRedirectMessage(err: unknown): err is RedirectMessage {
    return (
      err instanceof RedirectMessage ||
      // This is required for dev environments due to an issue with vite: https://github.com/vitejs/vite/issues/3910
      (isDev && err instanceof Error && err.constructor.name === "RedirectMessage")
    );
  }

export const onGet: RequestHandler = async ({ params, redirect, error, cookie }) => {
    try {
        const session = await authService.AuthorizeRegisterByToken(params.tcp);
        
        // Set token session
        cookie.set("TOKEN_SESSION", session.token, { path: "/" });
        
        // Proceed with your logic now that validation is successful
        throw redirect(308, "/dashboard");
    }
    catch(err) {
        const isExpired = err instanceof authService.SessionExpiredError;
        
        if(!isExpired) {
            if(isServerError(err)) {
                throw err;
            }

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

export default component$(() => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px", "max-width": "500px" }}>
                <CardHeader style={{ justifyContent: "center" }}>
                    <CheckFillIcon size="xl" styles={{ color: "red" }}></CheckFillIcon>
                    Enlace de verificación expirado
                </CardHeader>
                <Divider></Divider>
                <CardContent>
                    <p style="text-align: center">
                        El enlace de verificación que recibiste ha expirado. Por favor, solicita un nuevo enlace para continuar con la verificación de tu cuenta.
                    </p>
                    <Box mt={40} display="flex" justifyContent="center">
                        <Link href="/auth/signin">
                            <Button type="button" style={{ "min-width": "250px" }}>Ir al inicio</Button>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
});

