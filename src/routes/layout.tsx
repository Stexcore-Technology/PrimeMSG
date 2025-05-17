import { component$, Slot, useContextProvider } from "@builder.io/qwik";
import type { ILangType } from "~/types/lang";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import langService from "~/services/lang.service";
import currentSession from "~/server/currentSession";
import { SessionContext } from "~/contexts/session.context";

/**
 * Languages
 */
const languages: ILangType[] = ["es", "en"];

const ignoreStatic = [
  "/assets/",
  "/favicon.svg",
  "/manifest.json",
  "quicksand.ttf",
  "robots.txt"
];

/**
 * Handle current language
 */
export const onRequest: RequestHandler = async ({ request, redirect, url, params }) => {

  const isStatic = ignoreStatic.some((item) => url.href.startsWith(item));
  
  // Validate current lang  
  if(!isStatic && !languages.includes(String(params.lang) as ILangType)) {
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
