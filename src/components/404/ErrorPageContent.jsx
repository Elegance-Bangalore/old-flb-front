
import { Link } from "react-router-dom";
import Form from "./Form";
import errorImage from "@/CustomAssets/BuyerImages/error.png";


const ErrorPageContent = ({ mainContent = "Ohh! Page Not Found", content = "We can’t seem to find the page you’re looking for" }) => {
  return (
    <div className="error_page footer_apps_widget">
      <img
        className="img-fluid img-thumb contain"
        src={errorImage}
        alt="error.png"
      />
      <div className="erro_code">
        <h1>{mainContent}</h1>
      </div>
      <p>{content}</p>

      {/* <Form /> */}
      {/* End form */}

      <Link to="/" className="btn btn_error btn-thm">
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPageContent;
