import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * MetaComponent for Dynamic SEO with Prerender.io support
 * Uses react-helmet-async which works perfectly with SSR/Prerender.io
 * Note: HelmetProvider is already in main.jsx, so no need to wrap here
 */
export default function MetaComponent({
  meta = {
    title:
      "Farmland Bazaar – Buy & Sell Farmland Across India",
    description: "India's largest marketplace for managed farmlands, agriculture land, estates, and farmhouses. Explore verified listings across regions.",
    image: "",
  },
}) {
  return (
    <Helmet key={meta.title}>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
      {meta?.image && <meta property="og:image" content={meta?.image} />}
      {meta?.image && <meta property="og:image:secure_url" content={meta?.image} />}
      <meta property="og:title" content={meta?.title} />
      <meta property="og:description" content={meta?.description} />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
