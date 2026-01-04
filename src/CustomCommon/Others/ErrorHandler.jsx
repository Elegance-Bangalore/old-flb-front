import React from "react";
import BuyerHeader from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerHeader";
import DefaultMobileMenu from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/DefaultMobileMenu";
import errorImage from "@/CustomAssets/BuyerImages/error-two.png";

function ErrorHandler() {
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
              <div className="error_page footer_apps_widget">
                <img
                  className="img-fluid img-thumb contain"
                  src={errorImage}
                  alt="error.png"
                />
                <div className="erro_code">
                  <h1>Something went wrong</h1>
                </div>
                <p>
                  If you are frequently facing this issue, please contact us
                </p>

                <button
                  className="btn btn_error btn-thm me-3"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorHandler;
