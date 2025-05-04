import { component$, Slot, useContextProvider } from "@builder.io/qwik";
import type { ILangType } from "~/types/lang";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import langService from "~/services/lang.service";
import initConnection from "~/database/init.connection";
import currentSession from "~/server/currentSession";
import { SessionContext } from "~/contexts/session.context";

/**
 * Languages
 */
const languages: ILangType[] = ["es", "en"];

/**
 * Handle current language
 */
export const onRequest: RequestHandler = async ({ request, redirect, url, params }) => {

  // Validate current lang  
  if(!languages.includes(String(params.lang) as ILangType)) {
    // Accept language
    const acceptLanguage = request.headers.get("accept-language");
    // preferred
    const lang = langService.getPreferredLanguage(acceptLanguage || "");
    
    throw redirect(302, `/${lang}${url.pathname}`);
  }
};

/**
 * Append cache control
 */
export const onGet: RequestHandler = async ({ cacheControl }) => {
  
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

/**
 * Initialize database connection and get current session
 */
export const useInformation = routeLoader$(async (ev) => {
    await initConnection();

    return currentSession(ev);
});

/**
 * Layout ROOT
 */
export default component$(() => {
  // Initialize database connection!
  const session = useInformation();

  // Provider data
  useContextProvider(SessionContext, session.value);
    
  return <Slot />;
});
