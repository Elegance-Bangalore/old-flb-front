import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import BuyerFooter from "../Layouts/BuyerFooter";
import { getPropertyForHomePage } from "@/ApiRoutes/BuyersApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import PostPropertyAd from "../Components/HomeComponents/PostPropertyAd";
import BlogSection from "../Components/HomeComponents/BlogSection";
import CounterSection from "../Components/HomeComponents/CounterSection";
import WhyChooseSection from "../Components/HomeComponents/WhyChooseSection";
import TrendingProperties from "../Components/HomeComponents/TrendingProperties";
import CuratedDeals from "../Components/HomeComponents/CuratedDeals";
import { setting2, settings } from "@/CustomServices/sliderSetting";
import PropertyTypeCard from "../Components/HomeComponents/PropertyTypeCard";
import HighlyRecommendedProperty from "../Components/HomeComponents/HighlyRecommendedProperty";
import CategoryLoader from "@/CustomCommon/MaterialUi/CategoryLoader";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import HomeBannerSlider from "../Components/HomeComponents/HomeBannerSlider";
import FeatureDeveloper from "../Components/HomeComponents/FeatureDeveloper";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Testimonials from "../Components/CommonComponent/Testimonials";
import Media from "../Components/HomeComponents/Media";
import AnimatedSearch from "@/CustomCommon/AllRoles/AnimatedSearch";
import usePageSEO from "@/Seo";

const BuyerHome = () => {
  const [propertiesListCategoryWise, setPropertiesListCategoryWise] = useState(
    []
  );
  const [categoryLoader, setCategoryLoader] = useState(true);

  function propertiesList() {
    getPropertyForHomePage()
      .then((res) => {
        const data = res.data.categories;
        setPropertiesListCategoryWise(data);
      })
      .catch((error) => {
        throw error;
        toast.error("Please Check Your Internet Connection");
      })
      .finally(() => setCategoryLoader(false));
  }

  useEffect(() => {
    propertiesList();
  }, []);

  usePageSEO({
    title: "Farmland Bazaar – Buy & Sell Farmland Across India",
    description: "India's largest marketplace for managed farmlands, agriculture land, estates, and farmhouses. Explore verified listings across regions.",
    keywords: ["Farmland Bazaar", "Buy Farmland", "Sell Farmland", "Agricultural Land", "Farmhouse", "Real Estate"],
    ogTitle: "Farmland Bazaar – Buy & Sell Farmland Across India",
    ogDescription: "India's largest marketplace for managed farmlands, agriculture land, estates, and farmhouses. Explore verified listings across regions.",
    ogImage: "https://flb-public.s3.ap-south-1.amazonaws.com/2Geqhte2sdxuKmoZqqyjg.jpeg",
    ogUrl: "https://farmlandbazaar.com",
  })
  
  return(
    <>

    < main className = "buyers-main" style={{maxWidth:"100vw",overflow:"hidden"}} >
        <BuyerHeader />
        <DefaultMobileMenu />
        <div className="mobile-banner">
          <HomeBannerSlider />
          <div className="position-relative">
            <AnimatedSearch />
          </div>
        </div>

        <section className="fl-bg-light-green mobile-explore">
          <div className="container fl-container py-5">
            <div className="explore-wrapper fl-glass-bg rounded-5 p-2">
              <div className="bg-white rounded-5 pb-5 pt-4">
                <div className="text-center">
                  <h2 className="fl-heading-2 mb-5 fl-text-dark">
                  Explore Farmland, Agriculture Land, Estates & Farmhouses
                  </h2>
                </div>
                <PropertyTypeCard />
              </div>
            </div>
          </div>

          <CuratedDeals settings={settings} setting2={setting2} />
        </section>

        <WhyChooseSection />

  {
    categoryLoader ? (
      <>
        <CategoryLoader />
        <CategoryLoader />
        <CategoryLoader />
      </>
    ) : (
      propertiesListCategoryWise.map((element, index) => (
        <React.Fragment key={index}>
          <HighlyRecommendedProperty
            settings={settings}
            propertiesListCategoryWise={element}
            index={index}
            loader={categoryLoader}
          />
        </React.Fragment>
      ))
    )
  }

        <TrendingProperties settings={settings} setting2={setting2} />
        <CounterSection />
        <FeatureDeveloper />
        <BlogSection settings={settings} setting2={setting2} />
        <Testimonials />
        <Media />
        <PostPropertyAd />
        <BuyerFooter />
      </main >
    </>
  );
};

export default BuyerHome;
