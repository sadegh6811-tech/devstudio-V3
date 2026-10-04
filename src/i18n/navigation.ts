import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** لینک‌ها و ناوبری آگاه به زبان (prefixed routes) */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
