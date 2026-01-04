import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import BuyerLandingPage from "@/MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerLandingPage";
function PostPropertyLandingPage() {
  const user = useSelector(selectUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{user ? <Navigate to="/" /> : <BuyerLandingPage />}</>;
}

export default PostPropertyLandingPage;
