import React, { useEffect, useState } from "react";
import "../.././../SellerStyle/sellerStyle.scss";
import {
  selectSubscription,
  selectUser,
  setSubscription,
  userProfileAsync,
} from "@/Redux/Auth/authSlice";
import {
  existingPlanApi,
  paymentVerificationApi,
  selectPlanApi,
  createOrderApi,
  subscriptionPlanListApi,
  resendEmail,
} from "@/ApiRoutes/SellerApis";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";
import { toast } from "react-toastify";
import SubscriptionPriceModal from "@/components/Modals/SubscriptionPriceModal";
import PaymentSuccessfullModal from "@/components/Modals/PaymentSuccessfullModal";
import { Alert } from "react-bootstrap";
import right from "@/public/assets/images/subscription/tick-circle.svg";
import close from "@/public/assets/images/subscription/close-circle.svg";
import SubscriptionPlanCard from "../SubscriptionPlanCard";
// import { Tooltip } from "@mui/material";
// import right from "@/assets/images/right.png";
// import close from "@/assets/images/close.png";

function SubscriptionMain() {
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();
  const [planList, setPlanList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("3");
  const [paymentDoneModal, setPaymentDoneModal] = useState(false);
  const [existingPlan, setExistingPlan] = useState(null);

  console.log("PLAN LIST==>> ",planList)

  const validateSubscriptionId = async (subscriptionId) => {
    try {
      console.log("Validating subscription_id:", subscriptionId);
      
      // Try to fetch subscription details from Razorpay
      const response = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(import.meta.env.VITE_RAZORPAY_KEY + ':')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Subscription exists:", data);
        return true;
      } else {
        console.error("❌ Subscription not found or invalid:", response.status);
        return false;
      }
    } catch (error) {
      console.error("❌ Error validating subscription:", error);
      return false;
    }
  };

  async function getExistingSubscriptionPlan() {
    try {
      const response = await existingPlanApi();
      if (response.status === 200) {
        dispatch(setSubscription(response?.data?.data));
        setExistingPlan(response?.data?.data);
      }
    } catch (error) {
      throw error;
    }
  }

  async function verificationPayment(response) {
    try {
      console.log("Verification response:", response);
      
      // Extract necessary data from Razorpay response
      const {
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
      } = response;

      // Validate required fields
      if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
        throw new Error("Missing required payment verification data");
      }

      // Construct payload for verification API
      const verificationData = {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_subscription_id: razorpay_subscription_id,
        razorpay_signature: razorpay_signature,
      };

      console.log("Sending verification data:", verificationData);

      // Make HTTP POST request to the verification API
      const verificationResponse = await paymentVerificationApi(
        verificationData,
        user?._id
      );
      
      console.log("Verification API response:", verificationResponse);
      
      if (verificationResponse.status === 200) {
        toast.success("Payment verified successfully!");
        await getExistingSubscriptionPlan();
        setPaymentDoneModal(true);
      } else {
        throw new Error("Payment verification failed");
      }
      
    } catch (error) {
      console.error("Verification error:", error);
      
      if (error.response?.data?.message) {
        toast.error("Payment verification failed: " + error.response.data.message);
      } else {
        toast.error("Something went wrong in Payment verification: " + error.message);
      }
      
      setLoader(false);
    }
  }

  const handleBuyPlan = async (plan, amount, coupon) => {
    try {
      setRazorpayLoading(true);
      await buyPlan(plan || planDetails, amount, coupon);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setRazorpayLoading(false);
      setShowPriceModal(false);
    }
  };

  async function buyPlan(plan, amount, coupon) {
    try {
      setLoader(true);
      
      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        toast.error("Payment gateway not loaded. Please refresh the page and try again.");
        setLoader(false);
        setRazorpayLoading(false);
        setShowPriceModal(false);
        return;
      }
      
      // Check if Razorpay key is configured
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_wDeNd3lAx3MRtn";
      console.log("Using Razorpay key:", razorpayKey);
      
      if (!razorpayKey || razorpayKey === "rzp_test_wDeNd3lAx3MRtn") {
        console.warn("⚠️ Using fallback Razorpay test key. Please set VITE_RAZORPAY_KEY environment variable.");
        toast.warning("Using test payment gateway. For production, please configure a valid Razorpay key.");
      }
      
      // Prepare the request payload
      const requestPayload = {
        plan: plan?.planName,
        timePeriod: selectedDuration,
      };

      // Attach amount and coupon details if provided (from modal)
      if (typeof amount === 'number' && !Number.isNaN(amount)) {
        requestPayload.amount = amount;
      }
      if (coupon && typeof coupon === 'object') {
        requestPayload.couponCode = coupon.code;
        requestPayload.couponDiscount = coupon.discount;
        requestPayload.couponType = coupon.type;
      }
      
      console.log("Sending to backend:", requestPayload);
      console.log("Plan details:", plan);
      console.log("Selected duration:", selectedDuration);
      
      // Use the available selectPlanApi endpoint
      try {
        console.log("Creating payment checkout...");
        
        // Step 1: Create subscription/checkout on backend
        const response = await selectPlanApi(requestPayload);
        
        console.log("Full backend response:", response);
        console.log("Response data:", response.data);
        console.log("Response data.data:", response.data?.data);
        
        // Check different possible response structures
        let subscriptionData = null;
        
        if (response.data?.data?.subscription_id) {
          subscriptionData = response.data.data;
        } else if (response.data?.subscription_id) {
          subscriptionData = response.data;
        } else if (response.data?.data?.id) {
          // If backend returns 'id' instead of 'subscription_id'
          subscriptionData = {
            ...response.data.data,
            subscription_id: response.data.data.id
          };
        } else if (response.data?.id) {
          // If backend returns 'id' at root level
          subscriptionData = {
            ...response.data,
            subscription_id: response.data.id
          };
        }
        
        console.log("Processed subscription data:", subscriptionData);
        
        // Validate subscription_id format and existence
        if (subscriptionData && subscriptionData.subscription_id) {
          const subscriptionId = subscriptionData.subscription_id;
          
          // Check if subscription_id has valid format
          if (!subscriptionId.startsWith('sub_')) {
            console.error("Invalid subscription_id format:", subscriptionId);
            throw new Error(`Invalid subscription_id format: ${subscriptionId}. Should start with 'sub_'`);
          }
          
          // Check if subscription_id is too short (likely invalid)
          if (subscriptionId.length < 15) {
            console.error("Subscription_id too short:", subscriptionId);
            throw new Error(`Subscription_id too short: ${subscriptionId}`);
          }
          
          console.log("✅ Valid subscription_id found:", subscriptionId);
          
          // Validate user data before creating Razorpay options
          if (!user?.email) {
            throw new Error("User email is required for payment");
          }
          
          // Configure Razorpay with proper subscription data
          const options = {
            key: razorpayKey,
            subscription_id: subscriptionData.subscription_id,
            name: "Farmaland Bazaar",
            description: `${plan?.planName} Plan - ${selectedDuration} months`,
            image: "/assets/images/header-logo3.png",
            handler: async function (response) {
              console.log("Payment success response:", response);
              await verificationPayment(response);
            },
            modal: {
              ondismiss: function() {
                toast.error("Payment cancelled");
                // Use setTimeout to ensure state updates don't block UI
                setTimeout(() => {
                  setLoader(false);
                  setRazorpayLoading(false);
                  setShowPriceModal(false);
                  // Reload the page after payment cancellation
                  window.location.reload();
                }, 100);
              }
            },
            prefill: {
              name: user?.fullName || "User",
              email: user?.email,
              contact: user?.phone || "",
            },
            notes: {
              plan_name: plan?.planName || "Plan",
              duration: selectedDuration || "3",
              user_id: user?._id || "",
              recurring_info: "Your plan will auto-renew",
            },
            theme: {
              color: "#00a76f",
            },
          };
          
          // Validate Razorpay options before sending
          if (!options.key || options.key === "rzp_test_OtMXiKY4620aNl") {
            console.warn("⚠️ Using fallback test key - this may cause issues");
          }
          
          if (!options.subscription_id) {
            throw new Error("Subscription ID is required");
          }
          
          if (!options.prefill.email) {
            throw new Error("User email is required");
          }
          
          console.log("Razorpay options:", JSON.stringify(options, null, 2));
          
          // Initialize and open Razorpay
          try {
            const razor = new window.Razorpay(options);
            
            razor.on('payment.failed', function (response) {
              console.error("Payment failed:", response.error);
              toast.error("Payment failed: " + response.error.description);
              // Use setTimeout to ensure state updates don't block UI
              setTimeout(() => {
                setLoader(false);
                setRazorpayLoading(false);
                setShowPriceModal(false);
              }, 100);
            });
            
            razor.on('payment.cancelled', function (response) {
              console.log("Payment cancelled:", response);
              toast.error("Payment was cancelled");
              // Use setTimeout to ensure state updates don't block UI
              setTimeout(() => {
                setLoader(false);
                setRazorpayLoading(false);
                setShowPriceModal(false);
                // Reload the page after payment cancellation
                window.location.reload();
              }, 100);
            });
            
            razor.open();
            return;
          } catch (razorpayError) {
            console.error("Razorpay initialization error:", razorpayError);
            console.error("Razorpay error details:", {
              message: razorpayError.message,
              stack: razorpayError.stack,
              options: options
            });
            toast.error("Payment gateway error. Please try again.");
            setLoader(false);
            setRazorpayLoading(false);
            setShowPriceModal(false);
            return;
          }
        } else {
          setLoader(false);
          setRazorpayLoading(false);
          setShowPriceModal(false);
          throw new Error("No valid subscription data received from backend");
        }
        
      } catch (apiError) {
        console.error("API call failed:", apiError);
        console.error("API error response:", apiError.response);
        
        if (apiError.response?.status === 404) {
          toast.error("Payment service not available. Please contact support.");
        } else if (apiError.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Unable to setup payment. Please try again.");
        }
        
        setLoader(false);
        setRazorpayLoading(false);
        setShowPriceModal(false);
        return;
      }
      
    } catch (error) {
      console.error("Buy plan error:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      
      if (error.response?.data?.code === "BAD_REQUEST_ERROR") {
        console.error("Razorpay BAD_REQUEST_ERROR details:", error.response.data);
        toast.error("Payment setup failed. Please check your plan details and try again.");
      } else if (error.message.includes("subscription_id")) {
        toast.error("Backend error: " + error.message);
      } else if (error.response?.status === 404) {
        toast.error("Backend endpoint not found. Please check your server.");
      } else if (error.response?.status === 500) {
        toast.error("Backend server error. Please try again later.");
      } else {
        toast.error("Something went wrong in Buy Subscription: " + error.message);
      }
      
      setLoader(false);
      setRazorpayLoading(false);
      setShowPriceModal(false);
    }
  }

  async function subscriptionPlanList() {
    try {
      const response = await subscriptionPlanListApi();
      setPlanList(response?.data?.data);
    } catch (error) {
      throw error;
    }
  }

  function getPlanDetails(details) {
    setPlanDetails(details);
    if (details?.planName?.toLowerCase() === "silver") {
      setSelectedDuration("12");
    } else {
      setSelectedDuration("3");
    }
    setShowPriceModal(true);
  }

  function handleClose() {
    setShowPriceModal(false);
  }

  function resendEmailApi() {
    resendEmail({ email: user?.email })
      .then((res) => toast.success("Verification link sent to your email"))
      .catch((err) => toast.error("Something went wrong! Please try again"));
  }

  useEffect(() => {
    subscriptionPlanList();
  }, []);

  return (
    <>
      {!user?.isEmailVerified && (
        <div className="alert mb-4">
          <Alert variant="warning">
            <div className="d-flex justify-content-between align-items-center">
              <div style={{fontWeight:"bolder"}}>
                <strong>Email Verification Required!</strong> You need to verify your email address before you can subscribe to any plan.
                <br />
                <small className="text-muted">
                  Check your email inbox for a verification link, or click the button to resend it.
                </small>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={resendEmailApi}
                style={{padding:"10px 20px",fontSize:"12px"}}
              >
                Resend Verification Email
              </button>
            </div>
          </Alert>
        </div>
      )}

      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content style2 mt-3">
              <h2 className="breadcrumb_title">Manage Subscription </h2>
            </div>
            <div className="col-md-12 bg-white-shadow p-4">
              <div className="row">
                {/* <div className="col-md-3">
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div className="plan-price" style={{}}>
                        <div className="heading-hero">
                          <h3>Plans and Pricing</h3>
                        </div>
                        <ul className="plan-price-list plan-head" style={{ marginTop:"100px", paddingBottom:"22px"}}>
                          {planList?.length > 0 &&
                            planList[0].features.map((feature) => (
                              <li key={feature.name}>
                                <div className="feature-content" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                                  <p style={{fontSize:"10px"}}>{feature.name}</p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-3">
                  <SubscriptionPlanCard
                   planList={planList.length > 0 ? planList[0] : []}
                  />

                </div>
                <div className="col-md-9">
                  <SubscriptionCard
                    planList={planList}
                    buyPlan={buyPlan}
                    getPlanDetails={getPlanDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscriptionPriceModal
        showPriceModal={showPriceModal}
        planDetails={planDetails}
        handleClose={handleClose}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        buyPlan={handleBuyPlan}
        razorpayLoading={razorpayLoading}
      />
      <PaymentSuccessfullModal
        paymentDoneModal={paymentDoneModal}
        handleClose={() => setPaymentDoneModal(false)}
      />
<div className="alert mb-4">
  <Alert variant="warning">
    <div className="d-flex flex-column">
      <div style={{ fontWeight: "bolder", marginBottom: "8px" }}>Disclaimer:</div>
      <ul style={{ fontWeight: "bolder", listStyleType: "disc", paddingLeft: "20px", margin: 0 }}>
        <li>Only one property can be allocated for paid promotions per month.</li>
        <li>Once the developer or admin maps a property, it cannot be changed for at least 30 days.</li>
        <li>All prices are exclusive of 18% GST, which will be applied at checkout.</li>
        <li>
          This limited-time offer is subject to change or modification by Farmland Bazaar at any time without prior notice.
        </li>
        <li>
          Existing subscribers will retain their original plan, while new subscribers will be subject to the updated terms following any changes.
        </li>
      </ul>
    </div>
  </Alert>
</div>



    </>
  );
}

export default SubscriptionMain;


