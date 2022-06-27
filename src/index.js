import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StateProvider from "./contexts/StateProvider";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { ThemeProvider } from "./contexts/ThemeContext";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "pr"],
    fallbacking: "en",
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div>
    <h1>loading...</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={loadingMarkup}>
    <StateProvider>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </StateProvider>
  </Suspense>
);
