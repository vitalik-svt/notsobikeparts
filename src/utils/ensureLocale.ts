import { i18n } from "@/i18n/settings";
import { Locales } from "@/types/locales";

const SUPPORTED_LOCALES = i18n.locales;

function isValidLocale(v: unknown): v is Locales {
  return typeof v === 'string' && SUPPORTED_LOCALES.includes(v as Locales);
}

export function ensureLocale(v: unknown, fallback: Locales = i18n.defaultLocale as Locales): Locales {
  return isValidLocale(v) ? v : fallback;
}