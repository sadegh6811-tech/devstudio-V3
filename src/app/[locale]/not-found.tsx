import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Primitives";

/** صفحه ۴۰۴ */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Section className="grid min-h-[70vh] place-items-center pt-40">
      <div className="text-center">
        <p className="gradient-text text-7xl font-extrabold sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-mist">{t("desc")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-brand to-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          {t("home")}
        </Link>
      </div>
    </Section>
  );
}
