import ForgotPassword from "@/components/forgot-password";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Farmland Bazaar - Buy and Sell Farmlands, Agricultural Land, Farmhouses India",
  description: "Farmland Bazaar",
};

function ForgotPasswordPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ForgotPassword />
    </>
  );
}

export default ForgotPasswordPage;
