import { brandAssets } from "@/lib/brand/assets";
import { site, socialLinks } from "@/lib/site";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data, id }: { data: JsonLdValue; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  const logoUrl = `${site.url}${brandAssets.favicon.android512}`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.contactEmail,
    description: site.tagline,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
    },
    image: logoUrl,
    sameAs: [socialLinks.tiktok.href, socialLinks.instagram.href],
    areaServed: "Worldwide",
    knowsAbout: [
      "TikTok LIVE",
      "Creator agency",
      "Livestream coaching",
      "TikTok Creator Network",
      "Creator monetization",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.tagline,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function personSchema(input: {
  name: string;
  alternateName?: string;
  jobTitle: string;
  description: string;
  image: string;
  path: string;
  sameAs?: string[];
  knowsAbout?: string[];
  founderOfName?: string;
  founderOfUrl?: string;
}) {
  const imageUrl = input.image.startsWith("http")
    ? input.image
    : `${site.url}${input.image.startsWith("/") ? "" : "/"}${input.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    ...(input.alternateName ? { alternateName: input.alternateName } : {}),
    jobTitle: input.jobTitle,
    description: input.description,
    image: imageUrl,
    url: `${site.url}${input.path}`,
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: input.sameAs } : {}),
    ...(input.knowsAbout && input.knowsAbout.length > 0
      ? { knowsAbout: input.knowsAbout }
      : {}),
    worksFor: {
      "@type": "Organization",
      name: input.founderOfName ?? site.name,
      url: input.founderOfUrl ?? site.url,
    },
    ...(input.founderOfName
      ? {
          founderOf: {
            "@type": "Organization",
            name: input.founderOfName,
            url: input.founderOfUrl ?? site.url,
          },
        }
      : {}),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  /** Optional Person author for E-E-A-T (e.g. founder). Falls back to Organization. */
  author?: { name: string; path: string; jobTitle?: string };
  keywords?: string[];
}) {
  const author = input.author
    ? {
        "@type": "Person",
        name: input.author.name,
        url: `${site.url}${input.author.path}`,
        ...(input.author.jobTitle ? { jobTitle: input.author.jobTitle } : {}),
        worksFor: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      }
    : {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${site.url}${input.path}`,
    mainEntityOfPage: `${site.url}${input.path}`,
    author,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    datePublished: input.datePublished ?? "2026-01-01",
    dateModified: input.dateModified ?? input.datePublished ?? "2026-07-29",
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords.join(", ") } : {}),
  };
}

export function courseSchema(input: {
  name: string;
  description: string;
  path: string;
  lessonsCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    educationalLevel: "Beginner to Advanced",
    numberOfCredits: input.lessonsCount,
    inLanguage: "en",
    isAccessibleForFree: true,
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
