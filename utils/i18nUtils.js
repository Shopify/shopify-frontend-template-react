import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ShopifyFormat from "@shopify/i18next-shopify";
import resourcesToBackend from "i18next-resources-to-backend";
import { match } from "@formatjs/intl-localematcher";
import { shouldPolyfill as shouldPolyfillLocale } from "@formatjs/intl-locale/should-polyfill";
import { shouldPolyfill as shouldPolyfillPluralRules } from "@formatjs/intl-pluralrules/should-polyfill";
import {
  DEFAULT_LOCALE as DEFAULT_POLARIS_LOCALE,
  SUPPORTED_LOCALES as SUPPORTED_POLARIS_LOCALES,
} from "@shopify/polaris";

/**
 * The default locale for the app.
 *
 * This should correspond with the JSON file in the `locales` folder with the naming convention `{locale}.default.json`.
 * @example
 *   en.default.json
 */
const DEFAULT_APP_LOCALE = "en";

/**
 * The supported locales for the app.
 *
 * These should correspond with the JSON files in the `locales` folder.
 *
 * @example
 *   en.default.json
 *   de.json
 *   fr.json
 * @see Available languages in the Shopify Help Center:
 * https://help.shopify.com/en/manual/your-account/languages#available-languages
 */
const SUPPORTED_APP_LOCALES = ["en", "de", "fr"];

let _userLocale, _polarisTranslations;

/**
 * Retrieves the user's locale from the `locale` request parameter and matches it to supported app locales.
 *
 * Returns the default app locale if the user locale is not supported.
 *
 * @see https://shopify.dev/docs/apps/best-practices/internationalization/getting-started#step-2-get-access-to-the-users-locale
 *
 * @returns {string} User locale
 */
export function getUserLocale() {
  if (_userLocale) {
    return _userLocale;
  }
  const url = new URL(window.location.href);
  const locale = url.searchParams.get("locale") || DEFAULT_APP_LOCALE;
  _userLocale = match([locale], SUPPORTED_APP_LOCALES, DEFAULT_APP_LOCALE);
  return _userLocale;
}

/**
 * Returns Polaris translations that correspond to the user locale.
 *
 * Returns Polaris translations for the default locale if the user locale is not supported.
 *
 * @see https://polaris.shopify.com/components/utilities/app-provider#using-translations
 *
 * @returns {TranslationDictionary} Polaris translations
 */
export function getPolarisTranslations() {
  return _polarisTranslations;
}

/**
 * @async
 * Asynchronously initializes i18next and loads Polaris translations.
 *
 * Intended to be called before rendering the app to ensure translations are present.
 */
export async function initI18n() {
  await loadIntlPolyfills();
  await Promise.all([initI18next(), fetchPolarisTranslations()]);
}

/**
 * @private
 * @async
 * Asynchronously loads Intl polyfills for the default locale and user locale.
 */
async function loadIntlPolyfills() {
  if (shouldPolyfillLocale()) {
    await import("@formatjs/intl-locale/polyfill");
  }
  const promises = [];
  if (shouldPolyfillPluralRules(DEFAULT_APP_LOCALE)) {
    await import("@formatjs/intl-pluralrules/polyfill-force");
    promises.push(loadIntlPluralRulesLocaleData(DEFAULT_APP_LOCALE));
  }
  if (
    DEFAULT_APP_LOCALE !== getUserLocale() &&
    shouldPolyfillPluralRules(getUserLocale())
  ) {
    promises.push(loadIntlPluralRulesLocaleData(getUserLocale()));
  }
  await Promise.all(promises);
}

async function loadIntlPluralRulesLocaleData(locale) {
  return (
    await import(
      `../node_modules/@formatjs/intl-pluralrules/locale-data/${locale}.js`
    )
  ).default;
}

/**
 * @private
 * @async
 * Asynchronously initializes i18next.
 * @see https://www.i18next.com/overview/configuration-options
 * @returns Promise of initialized i18next instance
 */
async function initI18next() {
  return await i18next
    .use(initReactI18next)
    .use(ShopifyFormat)
    .use(localResourcesToBackend())
    .init({
      debug: process.env.NODE_ENV === "development",
      lng: getUserLocale(),
      fallbackLng: DEFAULT_APP_LOCALE,
      supportedLngs: SUPPORTED_APP_LOCALES,
      interpolation: {
        // React escapes values by default
        escapeValue: false,
      },
      react: {
        // Wait for the locales to be loaded before rendering the app
        // instead of using a Suspense component
        useSuspense: false,
      },
    });
}

function localResourcesToBackend() {
  return resourcesToBackend(async (locale, _namespace) => {
    const fallbackLng = Array.isArray(i18next.options.fallbackLng)
      ? i18next.options.fallbackLng[0]
      : i18next.options.fallbackLng;
    const defaultIndicator = locale === fallbackLng ? ".default" : "";
    return (await import(`../locales/${locale}${defaultIndicator}.json`))
      .default;
  });
}

/**
 * @private
 * @async
 * Asynchronously loads Polaris translations that correspond to the user locale.
 *
 * Loads Polaris translations for the default locale if the user locale is not supported.
 * @returns {Promise<TranslationDictionary>} Promise of Polaris translations
 */
async function fetchPolarisTranslations() {
  if (_polarisTranslations) {
    return _polarisTranslations;
  }
  // Get the closest matching default locale supported by Polaris
  const defaultPolarisLocale = match(
    [DEFAULT_APP_LOCALE],
    SUPPORTED_POLARIS_LOCALES,
    DEFAULT_POLARIS_LOCALE
  );
  // Get the closest matching user locale supported by Polaris
  const polarisLocale = match(
    [getUserLocale()],
    SUPPORTED_POLARIS_LOCALES,
    defaultPolarisLocale
  );
  _polarisTranslations = await loadPolarisTranslations(polarisLocale);
  return _polarisTranslations;
}

async function loadPolarisTranslations(locale) {
  return (
    await import(`../node_modules/@shopify/polaris/locales/${locale}.json`)
  ).default;
}
