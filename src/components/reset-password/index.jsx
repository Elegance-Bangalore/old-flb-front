import BuyerFooter from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerFooter";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
;
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";

const ResetPassword = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      {/* <Header /> */}

      
      {/* <MobileMenu /> */}

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

      {/* <!-- Our Footer --> */}
      {/* <section className="footer_one">
        <div className="container">
          <div className="row">
            <BuyerFooter />
          </div>
        </div>
      </section> */}

      {/* <!-- Our Footer Bottom Area --> */}
  
    </>
  );
};

export default ResetPassword;
