import { Cookie, RequestEvent } from "@builder.io/qwik-city";
import authService from "~/services/auth.service";
import currentSession from "./currentSession";

/**
 * Try to get the current session or redirect to /signin page
 * @param cookie Cookie
 * @param redirect Redirect function
 * @returns User session
 */
export default async function loadSession(cookie: Cookie, redirect: RequestEvent["redirect"]) {
    const session = currentSession(cookie);

    if(!session) throw redirect(307, "/auth/signin");
    return session;
}