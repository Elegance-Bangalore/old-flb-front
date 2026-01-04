import BuyerHeader from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerHeader";
;
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";
import BuyerFooter from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerFooter";
import DefaultMobileMenu from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/DefaultMobileMenu";


const ForgotPassword = () => {
  return (
    <main className="buyers-main">
      <div className="login-page">
      <DefaultMobileMenu/>

        <BuyerHeader headerHide={true} />

        {/* <!-- Modal --> */}
        

        {/* <!-- Inner Page Breadcrumb --> */}
        <BreadCrumbBanner />

        {/* <!-- Our LogIn Register --> */}
        <section className="our-log bgc-fa">
          <div className="container">
            <div className="row ">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <div className="login_form  inner_page px-2 px-lg-5">
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </section>

        <BuyerFooter />
      </div>
    </main>
  );
};

export default ForgotPassword;
