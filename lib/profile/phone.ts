import { parsePhoneNumberWithError, ParseError, type CountryCode } from "libphonenumber-js";

export interface PhoneValidationResult {
  valid: boolean;
  /** E.164 (e.g. "+14155551234"), only present when valid. */
  e164?: string;
  error?: string;
}

/**
 * Phone is optional everywhere it's collected -- callers must check for a
 * blank string themselves before calling this (an empty string is not
 * "invalid," it's "not provided"). When non-blank, validates and normalizes
 * to E.164 using libphonenumber-js's real numbering-plan metadata rather
 * than a hand-rolled regex, since "is this a plausible international phone
 * number" genuinely needs per-country rules, not a guess.
 *
 * `defaultCountry` disambiguates a national-format number (e.g. a UK-format
 * signup form pairs a country selector with a plain national number field);
 * if the raw value already starts with "+" it's parsed as fully
 * international and `defaultCountry` is only a fallback.
 */
export function validateAndNormalizePhone(
  raw: string,
  defaultCountry?: CountryCode,
): PhoneValidationResult {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Phone number is empty." };
  }
  try {
    const parsed = parsePhoneNumberWithError(trimmed, defaultCountry);
    if (!parsed.isValid()) {
      return { valid: false, error: "Enter a valid phone number, including country code." };
    }
    return { valid: true, e164: parsed.number };
  } catch (err) {
    if (err instanceof ParseError) {
      return { valid: false, error: "Enter a valid phone number, including country code." };
    }
    throw err;
  }
}
