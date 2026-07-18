import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. Link/redirect/getPathname apply the correct
// per-locale prefix automatically (none for `en`, `/ar` for `ar`), so callers
// use locale-less hrefs like "/solutions". usePathname returns the path WITHOUT
// the locale prefix — used by the language switcher to preserve the current page.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
