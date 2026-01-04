import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";

const BuyerPrivateRoute = ({ children }) => {
    const user = useSelector(selectUser);
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    if (user && user?.interested != "buy") {
        return <Navigate to="/" replace={true}></Navigate>;
    }
    return children;
};

export default BuyerPrivateRoute;