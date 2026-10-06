// mbdecor.co.uk blocks direct hotlinking of its images, so those photos are loaded
// through the wsrv.nl image proxy. Shopify (Mersey) images are used as they are.
export const resolveImage = (url: string, width = 800): string => {
  if (url.includes('mbdecor.co.uk')) {
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=85&output=jpg`;
  }
  return url;
};
