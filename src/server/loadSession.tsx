import { RequestEventCommon } from "@builder.io/qwik-city";
import currentSession from "./currentSession";
import getCurrentLang from "./currentLang";
import { ISessionInfo } from "~/types/session";

/**
 * Try to get the current session or redirect to /signin page
 * @param cookie Cookie
 * @param redirect Redirect function
 * @returns User session
 */
export default async function loadSession(ev: RequestEventCommon<QwikCityPlatform>): Promise<ISessionInfo> {
    const { langType } = getCurrentLang(ev);
    const session = await currentSession(ev);

    if(!session) throw ev.redirect(307, `/${langType}/auth/signin`);
    return session;
}