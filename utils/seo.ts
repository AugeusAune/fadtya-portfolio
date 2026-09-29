export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  keywords: string[];
}

export const getSiteMetadata = (): SiteMetadata => ({
  title: "Farhan Aditya | Full Stack Developer & Software Engineer",
  description: "Farhan Aditya is a passionate Full Stack Developer specializing in high-performance web applications, Vue/Nuxt, Laravel, and scalable modern architectures.",
  url: "https://fadtya-portfolio.vercel.app",
  image: "/image/hire.png",
  author: "Farhan Aditya",
  keywords: [
    "Farhan Aditya",
    "Full Stack Developer",
    "Software Engineer",
    "Nuxt 4",
    "Vue.js",
    "Laravel",
    "Tailwind CSS",
    "Web Developer Indonesia",
    "Portfolio"
  ]
});

export const generatePersonSchema = () => {
  const meta = getSiteMetadata();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: meta.author,
    url: meta.url,
    image: `${meta.url}${meta.image}`,
    jobTitle: "Full Stack Developer",
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "Nuxt.js",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "Elysia.js",
      "Tailwind CSS"
    ],
    sameAs: [
      "https://github.com/AugeusAune",
      "https://linkedin.com/in/farhanadityaa"
    ]
  };
};

export const generateWebSiteSchema = () => {
  const meta = getSiteMetadata();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Farhan Aditya Portfolio",
    url: meta.url,
    description: meta.description,
    author: {
      "@type": "Person",
      name: meta.author
    }
  };
};
