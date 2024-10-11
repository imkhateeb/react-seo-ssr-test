export const getHeader = (metaData) => {
  const siteUrl = "https://www.example.com";
  const siteDomain = "example.com";

  return `
<title>${metaData.seoTitle}</title>
<meta name="description" content="${metaData.seoDescription}">
<meta property="og:url" content="${siteUrl}">
<meta property="og:type" content="website">
<meta property="og:title" content="${metaData.seoTitle}">
<meta property="og:description" content="${metaData.seoDescription}"> <meta property="og:image" content="${metaData.seoImage}">
<meta name="twitter:card" content="summary_large_image"> <meta property="twitter:domain" content="${siteDomain}"> <meta property="twitter:url" content="${siteUrl}">
<meta name="twitter:title" content="${metaData.seoTitle}">
<meta name="twitter:description" content="${metaData.seoDescription}"> <meta name="twitter:image" content="${metaData.seoImage}"></meta>`;
};
