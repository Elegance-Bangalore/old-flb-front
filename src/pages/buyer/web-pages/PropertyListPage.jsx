import MetaComponent from "@/components/common/MetaComponent";
import useURLFilters from "@/CustomServices/useURLFilters";
import BuyerPropertyList from "@/MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerPropertyList";
import usePageSEO from "@/Seo";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function PropertyListPage() {
  const filters = useURLFilters();
  const { city = "" } = filters[0] || {};

  const [searchParams] = useSearchParams();
  const propertyType = searchParams.get('propertyType');


  console.log("FILTERS", filters);

  console.log("PROPERTY TYPE", propertyType);

  const metadata = {
    title: `Farmland Bazaar – ${propertyType || "Farmland" } for Sale in ${city || "India"}`,
    description: `${
      city ? `${city} - ` : ""
    }Buy and sell your farmlands, agricultural lands, and managed farmlands and farmhouses near you on India's largest online portal.`,
  };

  usePageSEO({
    title: metadata.title,
    description: metadata.description,
    keywords: ["Farmland Bazaar", "Buy Farmland", "Sell Farmland", "Agricultural Land", "Farmhouse", city].filter(Boolean),
    ogTitle: metadata.title,
    ogDescription: metadata.description,
    ogImage: "https://flb-public.s3.ap-south-1.amazonaws.com/2Geqhte2sdxuKmoZqqyjg.jpeg",
    ogUrl: window.location.href,
  })

  return (
    <div>
      <MetaComponent meta={metadata} />

      <BuyerPropertyList />
    </div>
  );
}

export default PropertyListPage;
