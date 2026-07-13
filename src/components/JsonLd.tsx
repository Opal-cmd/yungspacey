import {
  CREATOR_ALIASES,
  CREATOR_NAME,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CREATOR_NAME,
  alternateName: [...CREATOR_ALIASES],
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Music Producer & Sound Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: [INSTAGRAM_URL],
  knowsAbout: [
    "Music production",
    "Mixing",
    "Mastering",
    "Sound engineering",
    "R&B",
    "Drill",
    "Trap",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: ["Yung Spacey", "yung spacey"],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/opengraph-image`,
  areaServed: {
    "@type": "City",
    name: "Toronto",
  },
  provider: {
    "@type": "Person",
    name: CREATOR_NAME,
    alternateName: [...CREATOR_ALIASES],
    url: SITE_URL,
    sameAs: [INSTAGRAM_URL],
  },
  serviceType: [
    "Music production",
    "Mixing",
    "Mastering",
    "Executive production",
  ],
  sameAs: [INSTAGRAM_URL],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["Yung Spacey", "yung spacey"],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Person",
    name: CREATOR_NAME,
    url: SITE_URL,
  },
  inLanguage: "en-CA",
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
