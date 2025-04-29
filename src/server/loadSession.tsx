import { Cookie, RequestEvent } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";

export default async function loadSession(cookie: Cookie, redirect: RequestEvent["redirect"]) {
    try {
        const token = cookie.get("TOKEN_SESSION");

        if(token) {
            const user = await authService.getSessionInfoByToken(token.value);

            return user;
        }
    }
    catch(err) {
        if(!(err instanceof authService.SessionExpiredError)) {
            throw err;
        }
    }
    throw redirect(307, "/auth/signin");
}