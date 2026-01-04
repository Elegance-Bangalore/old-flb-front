import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleSubscriptionRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAndRedirect() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await fetch("/user/role-subscription", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const { user } = await res.json();
        const isSellerOrDeveloper = user.role === "seller" || user.role === "developer";
        const hasActivePlan = user.subscription && user.subscription.active;
        if (isSellerOrDeveloper) {
          if (!hasActivePlan) {
            navigate("/subscription");
          } else {
            navigate("/dashboard");
          }
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        navigate("/login");
      }
    }
    checkAndRedirect();
  }, [navigate]);

  return null;
};

export default RoleSubscriptionRedirect; 