import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeveloperInfoApi } from "@/ApiRoutes/BuyersApi";
import { generateDeveloperSlug } from "@/CustomServices/Constant";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

const DeveloperRedirect = () => {
  const { developerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToNewUrl = async () => {
      try {
        const response = await getDeveloperInfoApi({ developerId });
        const developerData = response?.data;
        const companyName = developerData?.seller?.companyName || developerData?.companyName;
        
        if (companyName) {
          const slug = generateDeveloperSlug(companyName);
          navigate(`/developer/${slug}/${developerId}`, { replace: true });
        } else {
          navigate("/404", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching developer data:", error);
        navigate("/404", { replace: true });
      }
    };

    if (developerId) {
      redirectToNewUrl();
    }
  }, [developerId, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <OnClickLoader />
    </div>
  );
};

export default DeveloperRedirect;
