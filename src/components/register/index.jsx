import BuyerHeader from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerHeader";
import MobileMenu from "../common/header/MobileMenu";
;
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";
import BuyerFooter from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerFooter";
import DefaultMobileMenu from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/DefaultMobileMenu";

const index = () => {
  return (
    <>
      <main className="buyers-main">
        {/* <!-- Main Header Nav --> */} 
        
        <BuyerHeader headerHide={true} />

         
        <DefaultMobileMenu/>

        {/* <!-- Modal --> */}
        

        {/* <!-- Inner Page Breadcrumb --> */}
        <BreadCrumbBanner />

        {/* <!-- Our LogIn Register --> */}
        <section className="our-log bgc-fa">
          <div className="container">
            <div className="row  ">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <div className="login_form  inner_page">
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default index;
