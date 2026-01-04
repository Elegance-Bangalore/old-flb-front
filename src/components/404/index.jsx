import BuyerHeader from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerHeader"; 
import ErrorPageContent from "./ErrorPageContent";
import BuyerFooter from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerFooter";
import DefaultMobileMenu from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/DefaultMobileMenu";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <BuyerHeader />
       
      <DefaultMobileMenu />

      {/* <!-- Modal --> */}

      {/* <!-- Our Error Page --> */}
      <section className="our-error bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <ErrorPageContent />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
