import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-nyheter.jpg";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SEO from "@/components/SEO";
import newsLogistik from "@/assets/news-logistik.jpg";
import newsKvalitet from "@/assets/news-kvalitet.jpg";
import newsUngdom from "@/assets/news-ungdom.jpg";
import newsTransport from "@/assets/news-transport.jpg";
import newsFramgang from "@/assets/news-framgang.jpg";
import newsMatchning from "@/assets/news-matchning.jpg";

const newsImages = [newsLogistik, newsKvalitet, newsUngdom, newsTransport, newsFramgang, newsMatchning];

const NyheterPage = () => {
  const { t } = useTranslation();
  const news = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    title: t(`newsPage.n${n}.title`),
    date: t(`newsPage.n${n}.date`),
    excerpt: t(`newsPage.n${n}.excerpt`),
    image: newsImages[i],
  }));

  return (
    <div>
      <SEO pageKey="news" />
      <PageHero kicker={t("newsPage.kicker")} title={t("newsPage.title")} description={t("newsPage.desc")} image={heroImg} />

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((n) => (
              <article key={n.title} className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/20 transition-colors group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-muted-foreground font-medium">{n.date}</span>
                  <h2 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-accent transition-colors">{n.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{n.excerpt}</p>
                  <span className="inline-block mt-4 text-sm text-accent font-medium">{t("newsPage.readMore")}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default NyheterPage;