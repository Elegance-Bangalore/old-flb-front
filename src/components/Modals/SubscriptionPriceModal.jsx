import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  formatNumberInCr,
  formatNumberWithoutDecimal,
} from "@/CustomServices/Constant";
import { validateCouponApi, API } from "@/ApiRoutes/AdminApi";
import { createOrderApi } from "@/ApiRoutes/SellerApis";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setSubscription } from "@/Redux/Auth/authSlice";
import { paymentVerificationApi } from "@/ApiRoutes/SellerApis";
import { existingPlanApi } from "@/ApiRoutes/SellerApis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SubscriptionPriceModal({
  planDetails,
  showPriceModal,
  handleClose,
  setSelectedDuration,
  selectedDuration,
  buyPlan,
  razorpayLoading
}) {
  console.log('planDetails:', planDetails, 'selectedDuration:', selectedDuration);
  
  // Coupon state management
  const [showCouponInput, setShowCouponInput] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState(null);
  const [couponDiscount, setCouponDiscount] = React.useState(0);
  const [couponLoading, setCouponLoading] = React.useState(false);
  const [couponError, setCouponError] = React.useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const handleCouponToggle = () => {
    setShowCouponInput(!showCouponInput);
    if (showCouponInput) {
      // Reset coupon when hiding input
      setCouponCode("");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    }
  };

  const handleCouponApply = async () => {
    if (!couponCode.trim()) return;
    
    setCouponLoading(true);
    setCouponError("");
    
    try {
      const totalPrice = calculateTotalPrice();
      const taxes = totalPrice * 0.18;
      const subtotal = totalPrice + taxes;

      const requestData = {
        couponCode: couponCode.trim().toUpperCase(),
        planId: planDetails?.id,
        planName: planDetails?.planName,
        duration: Number(selectedDuration),
        subtotal: subtotal,
        monthlyPrice: planDetails?.monthlyPrice
      };

      const baseURL = API?.defaults?.baseURL;
      const endpoint = `/admin/coupons/validate`;
      console.log("[Coupon] baseURL:", baseURL);
      console.log("[Coupon] endpoint:", endpoint);
      console.log("[Coupon] payload:", requestData);

      const response = await validateCouponApi(requestData);
      const data = response?.data || {};

      console.log("[Coupon] response status:", response?.status);
      console.log("[Coupon] response data:", data);

      if ((response.status >= 200 && response.status < 300) && data.success) {
        setAppliedCoupon({
          code: data.coupon.code,
          discount: data.coupon.discountAmount,
          type: data.coupon.discountType,
          description: data.coupon.description
        });
        setCouponDiscount(data.coupon.discountAmount);
        setShowCouponInput(false);
        setCouponError("");
      } else {
        setCouponError(data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error('[Coupon] validation error:', error);
      console.log('[Coupon] error response:', error?.response?.data);
      console.log('[Coupon] error status:', error?.response?.status);
      const apiMessage = error?.response?.data?.message || error?.message;
      setCouponError(apiMessage || "Failed to validate coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCouponRemove = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
  };

  const calculateTotalPrice = () => {
    let discountMultiplier =
      selectedDuration === 5 ? 5 / 6 : selectedDuration === 9 ? 9 / 12 : selectedDuration === "5" ? 5 / 6 : selectedDuration === "9" ? 9 / 12 : 1;
    return (
      parseFloat(planDetails?.monthlyPrice) *
      discountMultiplier *
      Number(selectedDuration)
    );
  };

  const totalPrice = calculateTotalPrice();
  const taxes = totalPrice * 0.18; // 18% of the total price
  const subtotal = totalPrice + taxes;
  const finalAmount = subtotal - couponDiscount;

  const handleOneTimePayment = async () => {
    try {
      setCouponLoading(true); // Reuse coupon loading state for one-time payment loading
      
      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        console.error("Payment gateway not loaded. Please refresh the page and try again.");
        setCouponLoading(false);
        return;
      }
      
      // Check if Razorpay key is configured
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_wDeNd3lAx3MRtn";
      console.log("Using Razorpay key:", razorpayKey);
      
      // Prepare the request payload similar to buyPlan
      const requestPayload = {
        planName: planDetails?.planName,
        timePeriod: selectedDuration,
        amount: finalAmount,
        paymentType: 'one_time'
      };

      // Add coupon details if applied
      if (appliedCoupon && typeof appliedCoupon === 'object') {
        requestPayload.couponCode = appliedCoupon.code;
        requestPayload.couponDiscount = appliedCoupon.discount;
        requestPayload.couponType = appliedCoupon.type;
      }
      
      console.log("Creating one-time payment order:", requestPayload);
      
      // Call createOrder API
      const response = await createOrderApi(requestPayload);
      
      console.log("One-time payment response:", response);
      
      // Handle successful response and initiate Razorpay payment
      if (response?.data?.success && response?.data?.data) {
        const orderData = response.data.data;
        console.log("One-time payment order created successfully:", orderData);
        
        // Prepare Razorpay options
        const options = {
          key: razorpayKey,
          amount: orderData.amount, // Amount in paise
          currency: orderData.currency,
          name: "EvoMart",
          description: `One-time payment for ${planDetails?.planName} plan`,
          order_id: orderData.id,
          handler: async function (rzpResponse) {
            try {
              console.log("Payment successful:", rzpResponse);
              // Send verification payload with order context
              const verificationPayload = {
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_signature: rzpResponse.razorpay_signature,
              };
              console.log("Sending one-time verification data:", verificationPayload, "userId:", user?._id);
              const verifyRes = await paymentVerificationApi(verificationPayload, user?._id);
              console.log("Verification API response:", verifyRes);
              if (verifyRes?.status === 200) {
                // Refresh subscription state so UI shows active package
                try {
                  const existingRes = await existingPlanApi();
                  if (existingRes?.status === 200) {
                    dispatch(setSubscription(existingRes?.data?.data));
                  }
                } catch (e) {
                  console.error("Failed to refresh subscription after one-time payment:", e);
                }
                handleClose();
              } else {
                alert("Payment verification failed. Please contact support.");
              }
            } catch (verErr) {
              console.error("Verification error:", verErr);
              alert("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: user?.fullName || "Customer Name",
            email: user?.email || "customer@example.com",
            contact: user?.phone || "9999999999"
          },
          notes: {
            plan: planDetails?.planName,
            duration: selectedDuration,
            paymentType: 'one_time'
          },
          theme: {
            color: "#28a745"
          }
        };

        // Add coupon info to notes if applied
        if (appliedCoupon) {
          options.notes.couponCode = appliedCoupon.code;
          options.notes.couponDiscount = appliedCoupon.discount;
        }

        // Open Razorpay payment modal
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (resp) {
          console.error("Payment failed:", resp.error);
          alert("Payment failed: " + resp.error.description);
        });
        
        razorpay.open();
        
      } else {
        console.error("One-time payment failed:", response?.data?.message);
        alert("Failed to create payment order. Please try again.");
      }
      
    } catch (error) {
      console.error("One-time payment error:", error);
      console.error("Error response:", error?.response?.data);
      
      // Handle different error scenarios
      if (error?.response?.status === 404) {
        console.error("One-time payment service not available");
        alert("Payment service not available. Please contact support.");
      } else if (error?.response?.status === 500) {
        console.error("Server error for one-time payment");
        alert("Server error. Please try again later.");
      } else {
        console.error("One-time payment failed:", error?.message);
        alert("Payment failed. Please try again.");
      }
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showPriceModal}
      >
        <div className="custom-modal-header px-4 py-3 mt-2">
          <h5 className="text-uppercase text-dark-green fw-600">
            {planDetails?.planName}
          </h5>
          <p className="mb-0 text-medium-grey">
            Choose a billing period and finish the purchase process
          </p>
        </div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="px-4 pt-1">
          <div className="mb-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={planDetails?.planName?.toLowerCase() === "silver" ? "12" : "3"}
                name="radio-buttons-group"
                value={selectedDuration}
                onChange={handleDurationChange}
              >
                {planDetails?.planName?.toLowerCase() === "silver" ? (
                  <div
                    className={`mb-1 radio-container px-3 ${
                      selectedDuration === "9"
                        ? "bg-border-light-green"
                        : "bg-border-light-gray"
                    }`}
                  >
                    <FormControlLabel
                      value={"12"}
                      control={<Radio />}
                      label="12 months"
                    />
                    <button className="pill-btn-gold me-3 px-3 text-white fs-6 fw-semi-bold">
                      <em>3 month Free</em>
                    </button>
                    <div className="d-flex gap-3 align-items-center sub-price">
                   
                      <h5 className="mb-0">
                        {formatNumberWithoutDecimal(
                          (parseInt(planDetails?.monthlyPrice) * 12) / 12
                        )}
                        <span> /Month</span>
                      </h5>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`mb-3 radio-container px-3 ${
                        selectedDuration === "3"
                          ? "bg-border-light-green"
                          : "bg-border-light-gray"
                      }`}
                    >
                      <FormControlLabel
                        value={"3"}
                        control={<Radio />}
                        label="3 months"
                      />
                      <div className="d-flex gap-3 align-items-center sub-price">
                        <h5 className="mb-0">
                          {formatNumberWithoutDecimal(planDetails?.monthlyPrice)} /
                          <span>Month</span>
                        </h5>
                      </div>
                    </div>
                    <div
                      className={`mb-3 radio-container px-3 ${
                        selectedDuration === "5"
                          ? "bg-border-light-green"
                          : "bg-border-light-gray"
                      }`}
                    >
                      <FormControlLabel
                        value={"5"}
                        control={<Radio />}
                        label="6 months"
                      />
                      <button className="pill-btn-gold me-3 px-3 text-white fs-6 fw-semi-bold">
                        <em>1 month Free </em>
                      </button>
                      <div className="d-flex gap-3 align-items-center sub-price">
                        <h6 className="mb-0">
                          <strike>{formatNumberInCr(planDetails?.monthlyPrice)}</strike>
                          
                        </h6>
                        <h5 className="mb-0">
                          {formatNumberWithoutDecimal(
                            (parseInt(planDetails?.monthlyPrice) * 5) / 6
                          )}
                          <span> /Month</span>
                        </h5>
                      </div>
                    </div>
                    <div
                      className={`mb-1 radio-container px-3 ${
                        selectedDuration === "9"
                          ? "bg-border-light-green"
                          : "bg-border-light-gray"
                      }`}
                    >
                      <FormControlLabel
                        value={"9"}
                        control={<Radio />}
                        label="12 months"
                      />
                      <button className="pill-btn-gold me-3 px-3 text-white fs-6 fw-semi-bold">
                        <em>3 month Free</em>
                      </button>
                      <div className="d-flex gap-3 align-items-center sub-price">
                        <h6 className="mb-0">
                          <strike>{formatNumberInCr(planDetails?.monthlyPrice)}</strike>
                        </h6>
                        <h5 className="mb-0">
                          {formatNumberWithoutDecimal(
                            (parseInt(planDetails?.monthlyPrice) * 9) / 12
                          )}
                          <span> /Month</span>
                        </h5>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup>
            </FormControl>
          </div>

          {/* Coupon Section */}
          <div className="mb-4">
            {!appliedCoupon ? (
              <div className="text-center">
                <p className="mb-2 text-medium-grey">
                  Have a coupon?{" "}
                  <button
                    type="button"
                    className="btn-link text-green text-decoration-underline border-0 bg-transparent p-0"
                    onClick={handleCouponToggle}
                  >
                    Click here to apply
                  </button>
                </p>
                
                {showCouponInput && (
                  <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                      <TextField
                        size="small"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponLoading}
                        sx={{
                          minWidth: "200px",
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleCouponApply}
                        disabled={!couponCode.trim() || couponLoading}
                        sx={{
                          backgroundColor: '#28a745',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: '#218838',
                          }
                        }}
                      >
                        {couponLoading ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                    
                    {couponError && (
                      <div className="text-danger small mt-1">
                        {couponError}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-between p-3 bg-light-green rounded-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-green fw-bold">✓</span>
                  <div>
                    <span className="text-green fw-bold">Coupon Applied: {appliedCoupon.code}</span>
                    {appliedCoupon.description && (
                      <div className="small text-medium-grey">{appliedCoupon.description}</div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-link text-danger text-decoration-underline border-0 bg-transparent p-0"
                  onClick={handleCouponRemove}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="p-3 bg-light-gray rounded-2">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="">
                Taxes & Fees{" "}
                <span>
                  <InfoOutlinedIcon className="text-gray fs-5" />
                </span>
              </h5>
              <h5 className="">{`${formatNumberWithoutDecimal(taxes)}`}</h5>
            </div>
            
            {appliedCoupon && (
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="text-green">
                  Coupon Discount ({appliedCoupon.code})
                </h5>
                <h5 className="text-green">-{`${formatNumberWithoutDecimal(couponDiscount)}`}</h5>
              </div>
            )}
            
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h4 className="fw-bold">Total</h4>
              <h4 className="fw-bold">{`${formatNumberWithoutDecimal(
                finalAmount
              )}`}</h4>
            </div>
            <div className="">
              <p className="mb-0" style={{ fontSize: ".85rem" }}>
                By Proceeding, you agree with our{" "}
                <Link className="text-green text-decoration-underline">
                  Terms of Service
                </Link>{" "}
                and confirm that you have read our{" "}
                <Link className="text-green text-decoration-underline">
                  Privacy Policy
                </Link>
                . You can cancel recurring payments at any time.
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="justify-content-center mb-3" >
          <div className="d-flex gap-3 " style={{justifyContent:"flex-end",width:"97%", }}>
            {/* <button 
              className="btn-upgrade text-capitalize px-5" 
              onClick={() => buyPlan(planDetails, finalAmount, appliedCoupon)} 
              disabled={razorpayLoading}

              style={{
                padding:"10px 20px",
                borderRadius:"0px"
              }}
            >
              {razorpayLoading ? "Loading..." : "RECURRING SUBSCRIPTION"}
            </button> */}
           <button 
  className="btn btn-outline-primary text-capitalize px-5" 
  onClick={handleOneTimePayment}
  disabled={razorpayLoading || couponLoading}
  style={{
    background: "#00a76f",
    color: "white",
    padding: "14px 28px",   // more breathing space
    fontWeight: "600",      // medium-bold
    fontSize: "16px",       // bigger text
    borderRadius: "25px",   // smoother pill-style button
    border: "none",         // cleaner look
    cursor: razorpayLoading || couponLoading ? "not-allowed" : "pointer"
  }}
>
  {couponLoading ? "Processing..." : "Proceed"}
</button>

          </div>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
