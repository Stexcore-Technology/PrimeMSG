import { RequestEventBase } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";
import httpService from "~/services/http.service";

/**
 * Try to get the current session
 * @param cookie Cookie
 * @param redirect Redirect function
 * @returns User session
 */
export default async function currentSession(ev: RequestEventBase) {
    try {
        const token = ev.cookie.get("TOKEN_SESSION");

        if(token) {
            const user = await authService.getSessionInfoByToken(token.value);

            return user.data.data;
        }
    }
    catch(err) {
        if(!(err instanceof httpService.RequestError && err.statusCode === 401)) {
            throw err;
        }
    }

    return null;
}