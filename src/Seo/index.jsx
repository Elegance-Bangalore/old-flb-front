import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO Component for Dynamic SEO with Prerender.io support
 * This component uses react-helmet-async which works perfectly with SSR/Prerender.io
 * because it renders meta tags in the HTML during server-side rendering
 * 
 * Use this component in your JSX for better SSR support
 */
export const SEOComponent = ({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  twitterCard = "summary_large_image",
  twitterSite = "@FarmlandBazaar",
}) => {
  // Get current URL if ogUrl not provided
  const currentUrl = ogUrl || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:secure_url" content={ogImage} />}
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

/**
 * Hook version for backward compatibility
 * Uses both Helmet (for SSR) and DOM manipulation (for client-side updates)
 * This ensures SEO works with both Prerender.io and normal browser rendering
 */
const usePageSEO = ({
  title = "Farmland Bazaar – Buy & Sell Farmland Across India",
  description = "India's largest marketplace for managed farmlands, agriculture land, estates, and farmhouses. Explore verified listings across regions.",
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl = "https://farmlandbazaar.com/blog",
  ogType = "website",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  twitterCard = "summary_large_image",
  twitterSite = "@FarmlandBazaar",
}) => {
  useEffect(() => {
    // Setting document title (for client-side)
    if (typeof window !== "undefined") {
      window.document.title = title;

      // Set meta tags for general SEO, OG, and Twitter (client-side fallback)
      setMetaTag("name", "description", description);
      setMetaTag("name", "keywords", keywords.join(", "));
      
      // Open Graph tags
      setMetaTag("property", "og:title", ogTitle || title);
      setMetaTag("property", "og:description", ogDescription || description);
      setMetaTag("property", "og:image", ogImage);
      setMetaTag("property", "og:image:secure_url", ogImage);
      setMetaTag("property", "og:url", ogUrl || window.location.href);
      setMetaTag("property", "og:type", ogType);
      setMetaTag("property", "og:image:width", ogImageWidth);
      setMetaTag("property", "og:image:height", ogImageHeight);
      
      // Twitter tags
      setMetaTag("name", "twitter:card", twitterCard);
      setMetaTag("name", "twitter:site", twitterSite);
      setMetaTag("name", "twitter:title", ogTitle || title);
      setMetaTag("name", "twitter:description", ogDescription || description);
      setMetaTag("name", "twitter:image", ogImage);
    }

    return () => {
      // Clean up meta tags if component unmounts
      if (typeof window !== "undefined") {
        setMetaTag("name", "description", "");
        setMetaTag("name", "keywords", "");
        setMetaTag("property", "og:title", "");
        setMetaTag("property", "og:description", "");
        setMetaTag("property", "og:image", "");
        setMetaTag("property", "og:image:secure_url", "");
        setMetaTag("property", "og:url", "");
        setMetaTag("property", "og:type", "");
        setMetaTag("property", "og:image:width", "");
        setMetaTag("property", "og:image:height", "");
        setMetaTag("name", "twitter:card", "");
        setMetaTag("name", "twitter:site", "");
        setMetaTag("name", "twitter:title", "");
        setMetaTag("name", "twitter:description", "");
        setMetaTag("name", "twitter:image", "");
      }
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, ogType, ogImageWidth, ogImageHeight, twitterCard, twitterSite]);

  const setMetaTag = (attr, key, content) => {
    if (typeof window === "undefined") return;
    
    if (content) {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    } else {
      // Remove meta tag if content is empty
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (element) {
        element.remove();
      }
    }
  };
  
  // Return null - hook doesn't render anything
  // Use SEOComponent separately if you want Helmet-based SSR
  return null;
};

export default usePageSEO;
