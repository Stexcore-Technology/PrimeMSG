import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  routeLoader$,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik";

import "./global.css";
import LangProvider from "./providers/lang.provider";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <LangProvider>
        <head>
          <meta charset="utf-8" />
          {!isDev && (
            <link
              rel="manifest"
              href={`${import.meta.env.BASE_URL}manifest.json`}
            />
          )}
          <RouterHead />
        </head>
        <body lang="en">
          <RouterOutlet />
          {!isDev && <ServiceWorkerRegister />}
        </body>
      </LangProvider>
    </QwikCityProvider>
  );
});
