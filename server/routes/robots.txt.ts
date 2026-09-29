export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return `User-agent: *
Allow: /

Sitemap: https://fadtya-portfolio.vercel.app/sitemap.xml
`;
});
