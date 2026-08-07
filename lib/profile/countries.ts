import type { CountryCode } from "libphonenumber-js";

/**
 * Curated, not exhaustive: the countries this platform's actual audience is
 * most likely to sign up from, covering every major English-speaking
 * market plus the study-abroad destinations in docs/product-expansion. Each
 * `code` is a real ISO 3166-1 alpha-2 country code libphonenumber-js
 * recognizes -- validation always defers to that library's real numbering
 * plan data, this list only drives the dropdown label/default.
 */
export const PHONE_COUNTRIES: { code: CountryCode; name: string; callingCode: string }[] = [
  { code: "US", name: "United States", callingCode: "+1" },
  { code: "CA", name: "Canada", callingCode: "+1" },
  { code: "GB", name: "United Kingdom", callingCode: "+44" },
  { code: "IE", name: "Ireland", callingCode: "+353" },
  { code: "AU", name: "Australia", callingCode: "+61" },
  { code: "DE", name: "Germany", callingCode: "+49" },
  { code: "IN", name: "India", callingCode: "+91" },
  { code: "PK", name: "Pakistan", callingCode: "+92" },
  { code: "BD", name: "Bangladesh", callingCode: "+880" },
  { code: "NG", name: "Nigeria", callingCode: "+234" },
  { code: "PH", name: "Philippines", callingCode: "+63" },
  { code: "ZA", name: "South Africa", callingCode: "+27" },
  { code: "SG", name: "Singapore", callingCode: "+65" },
  { code: "AE", name: "United Arab Emirates", callingCode: "+971" },
  { code: "FR", name: "France", callingCode: "+33" },
  { code: "ES", name: "Spain", callingCode: "+34" },
  { code: "IT", name: "Italy", callingCode: "+39" },
  { code: "NL", name: "Netherlands", callingCode: "+31" },
  { code: "BR", name: "Brazil", callingCode: "+55" },
  { code: "MX", name: "Mexico", callingCode: "+52" },
  { code: "JP", name: "Japan", callingCode: "+81" },
  { code: "CN", name: "China", callingCode: "+86" },
  { code: "KR", name: "South Korea", callingCode: "+82" },
  { code: "NZ", name: "New Zealand", callingCode: "+64" },
];

export const DEFAULT_PHONE_COUNTRY: CountryCode = "US";
