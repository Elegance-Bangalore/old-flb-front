import React, { useEffect } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import BuyerFooter from "../Layouts/BuyerFooter";
import aboutImage from "../../../../../CustomAssets/BuyerImages/about.png";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { getTermsAndConditionsApi } from "@/ApiRoutes/AdminApi";
const BuyerTerm = () => {
  const [content, setContent] = React.useState([]);

  async function getContent() {
    try {
      const response = await getTermsAndConditionsApi();
      console.log("Response", response);
      if (response?.data?.terms?.length) {
        setContent(response?.data?.terms[0]?.termsCondition);
      }
    } catch (error) {
      toastMessage();
      throw error;
    }
  }


  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-about-banner-hero">
          <div className="container fl-container">
            <h1 className="text-white fl-banner-heading">Terms & Conditions</h1>
          </div>
        </section>
        <section>
          <div className="container fl-container">
            <div className="row">
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerTerm;
