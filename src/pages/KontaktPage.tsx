import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";

const KontaktPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SEO pageKey="contact" />
      <section className="pb-[var(--section-pad)] pt-[152px] lg:pt-[184px] bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading title={t("contact.title")} align="left" />
              <div className="space-y-6 -mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0"><Phone className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{t("contact.phone")}</h3>
                    <a href="tel:+4687585607" className="text-muted-foreground hover:text-accent transition-colors">08-758 56 07</a><br />
                    <a href="tel:+46733689228" className="text-muted-foreground hover:text-accent transition-colors">0733-689 228</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0"><Mail className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{t("contact.email")}</h3>
                    <a href="mailto:info@personaluthyrning.net" className="text-muted-foreground hover:text-accent transition-colors">info@personaluthyrning.net</a><br />
                    <a href="mailto:daniel@personaluthyrning.net" className="text-sm text-muted-foreground hover:text-accent transition-colors">daniel@personaluthyrning.net ({t("contact.contactPerson")})</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{t("contact.address")}</h3>
                    <p className="text-muted-foreground">Sjöängsvägen 6, 192 72 Sollentuna</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0"><Clock className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{t("contact.hours")}</h3>
                    <p className="text-muted-foreground">{t("contact.hoursValue")}</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-secondary rounded-xl">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{t("contact.quickResponse")}</strong> {t("contact.quickResponseDesc")}
                </p>
              </div>
            </div>

            <div>
              <SectionHeading title={t("contact.formTitle")} align="left" />
              <form className="space-y-5 -mt-8">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.name")}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.namePlaceholder")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.company")}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.companyPlaceholder")} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.emailLabel")}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.emailPlaceholder")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.phoneLabel")}</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition" placeholder={t("contact.phonePlaceholder")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.subject")}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition">
                    <option value="">{t("contact.subjectPlaceholder")}</option>
                    <option>{t("contact.staffingNeed")}</option>
                    <option>{t("contact.workWithUs")}</option>
                    <option>{t("contact.partnership")}</option>
                    <option>{t("contact.otherQuestion")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.message")}</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition resize-none" placeholder={t("contact.messagePlaceholder")} />
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent-glow transition-colors">
                  {t("contact.submit")}
                </button>
                <p className="text-xs text-muted-foreground text-center">{t("contact.gdpr")}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontaktPage;