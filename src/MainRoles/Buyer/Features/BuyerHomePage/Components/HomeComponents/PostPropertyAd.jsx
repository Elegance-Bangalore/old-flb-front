import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { admin, buy, sell, subAdmin } from "@/CustomServices/Constant";

function PostPropertyAd() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const postProperty = () => {
    if (!user) {
      toast.success("Please make a seller account first");
      navigate("/post-your-property", { state: { interested: "sell" } });
    } else if (user.interested === buy) {
      toast.info("Please login as seller");
    } else if (user.interested === admin || user.interested === subAdmin) {
      navigate("/admin/add-property");
    } else if (user.interested === sell) {
      navigate("/seller/post-property");
    }
  };

  return (
    <section className="fl-bg-light-green">
      <div className="container fl-container text-center">
        <h2 className="fl-ff-main fl-text-dark fl-heading-2">
          Unlock the Potential of Your Land!{" "}
        </h2>
        <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
          Post Your Property Today and Connect with Interested Buyers!
        </p>
        <div className="btn">
          <button className="fl-btn-yellow" onClick={postProperty}>
            Post your property
          </button>
        </div>
      </div>
    </section>
  );
}

export default PostPropertyAd;
