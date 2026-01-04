import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Checkbox, FormControlLabel, Tooltip, Radio, RadioGroup, FormControl } from "@mui/material";
import { Link } from "react-router-dom";

function PropertyInquiryModal({
  show,
  handleClose,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  handleNumberOnly,
  user,
  fromDeveloperProfile,
  propertyList,
  otp,
  isOtpSent,
  agree,
  setAgree,
  loader,
  handleSubmit,
  // New props for additional fields
  reasonToBuy,
  setReasonToBuy,
  preferredLocation,
  setPreferredLocation,
  budget,
  setBudget,
  homeLoanOptions,
  setHomeLoanOptions,
  siteVisits,
  setSiteVisits,
  termsAgreed,
  setTermsAgreed,
}) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (show) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll when modal closes
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [show]);

  const handleReasonToBuyChange = (event) => {
    setReasonToBuy(event.target.value);
    // Also update the formik values
    handleChange({
      target: {
        name: 'reasonToBuy',
        value: event.target.value
      }
    });
  };

  const handlePreferredLocationChange = (event) => {
    setPreferredLocation(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleHomeLoanOptionsChange = (event) => {
    setHomeLoanOptions(event.target.checked);
  };

  const handleSiteVisitsChange = (event) => {
    setSiteVisits(event.target.checked);
  };

  const handleTermsAgreedChange = (event) => {
    setTermsAgreed(event.target.checked);
  };

  const handlePhoneChange = (event) => {
    const inputValue = event.target.value;
    
    // Remove +91 prefix if user tries to delete it
    let phoneNumber = inputValue.replace(/^\+91\s*/, '');
    
    // Only allow digits
    phoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Limit to 10 digits
    phoneNumber = phoneNumber.slice(0, 10);
    
    // Update the formik values with just the digits
    handleChange({
      target: {
        name: 'buyerPhone',
        value: phoneNumber
      }
    });
  };

  const getDisplayPhoneValue = () => {
    if (!values.buyerPhone) return '+91 ';
    return `+91 ${values.buyerPhone}`;
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="inquiry-dialog-title"
      fullWidth
      maxWidth="md"
      disableScrollLock={true}
      PaperProps={{
        style: {
          maxHeight: '90vh',
          overflow: 'auto',
          margin: '16px'
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          '@media (max-width: 768px)': {
            margin: '8px',
            maxHeight: '95vh',
            width: 'calc(100% - 16px)'
          }
        }
      }}
    >
      <DialogTitle id="inquiry-dialog-title" className="text-center">
        <h4 className="fl-text-dark text-uppercase mb-0 fl-fs-22" style={{
          fontSize: 'clamp(18px, 4vw, 22px)', // Responsive font size
          lineHeight: '1.3'
        }}>
          Please fill in your details
        </h4>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            <h5 className="fl-text-dark mb-3" style={{
              fontSize: 'clamp(16px, 3.5vw, 18px)',
              lineHeight: '1.4'
            }}>Basic Information (Mandatory Fields)</h5>
            
            {/* Reason to Buy */}
            <div className="form-group mb-3">
              <label className="form-label fw-bold">Reason to Buy*</label>
              <FormControl component="fieldset">
                <RadioGroup
                  value={reasonToBuy}
                  onChange={handleReasonToBuyChange}
                  row
                  sx={{
                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                      '& .MuiFormControlLabel-root': {
                        marginRight: 0,
                        marginBottom: '8px'
                      }
                    }
                  }}
                >
                  <FormControlLabel 
                    value="investment" 
                    control={<Radio />} 
                    label="Investment" 
                  />
                  <FormControlLabel 
                    value="self-use" 
                    control={<Radio />} 
                    label="Self Use (farming, weekend home, farmhouse, etc.)" 
                  />
                </RadioGroup>
              </FormControl>
              <ShowError 
                touched={touched.reasonToBuy} 
                message={errors.reasonToBuy} 
              />
            </div>

            {/* Contact Details */}
            <div className="form-group mb-2">
              <label className="form-label fw-bold">Full Name*</label>
              <input
                className="form-control border-2"
                type="text"
                name="buyerName"
                placeholder="Enter your full name"
                disabled={user ? true : false}
                value={values.buyerName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                style={{
                  fontSize: '16px', // Prevents zoom on iOS
                  padding: '12px'
                }}
              />
              <ShowError touched={touched.buyerName} message={errors.buyerName} />
            </div>

            <div className="form-group mb-2">
              <label className="form-label fw-bold">Email ID*</label>
              <input
                className="form-control border-2"
                type="email"
                placeholder="Enter your email address"
                name="buyerEmail"
                disabled={user ? true : false}
                value={values.buyerEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Please enter a valid email address (e.g., name@example.com)."
                style={{
                  fontSize: '16px', // Prevents zoom on iOS
                  padding: '12px'
                }}
              />
              <ShowError touched={touched.buyerEmail} message={errors.buyerEmail} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label fw-bold">Mobile Number*</label>
              <input
                className="form-control border-2"
                type="tel"
                placeholder="+91 XXXXXXXXXX"
                maxLength={15}
                value={getDisplayPhoneValue()}
                disabled={user ? true : false}
                name="buyerPhone"
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                inputMode="numeric"
                required
                pattern="^\+91\s\d{10}$"
                title="Enter a 10-digit mobile number after +91 (e.g., +91 9876543210)."
                style={{
                  fontSize: '16px', // Prevents zoom on iOS
                  padding: '12px'
                }}
              />
              <ShowError
                touched={touched.buyerPhone}
                message={errors.buyerPhone}
              />
            </div>
          </div>

          {/* Optional Information Section */}
          <div className="col-12 col-lg-6 mb-4">
            <h5 className="fl-text-dark mb-3" style={{
              fontSize: 'clamp(16px, 3.5vw, 18px)',
              lineHeight: '1.4'
            }}>Optional Information (Helps us serve you better)</h5>
            
            <div className="form-group mb-2">
              <label className="form-label">Property Preferences</label>
              <input
                className="form-control border-2"
                type="text"
                placeholder="Preferred Location"
                value={preferredLocation}
                onChange={handlePreferredLocationChange}
                style={{
                  fontSize: '16px', // Prevents zoom on iOS
                  padding: '12px'
                }}
              />
            </div>

            <div className="form-group mb-3">
              <input
                className="form-control border-2"
                type="text"
                placeholder="Budget Range"
                value={budget}
                onChange={handleBudgetChange}
                style={{
                  fontSize: '16px', // Prevents zoom on iOS
                  padding: '12px'
                }}
              />
            </div>

            <div>
          <div className="mb-3">
            <FormControlLabel
              control={
                <Checkbox
                  checked={homeLoanOptions}
                  onChange={handleHomeLoanOptionsChange}
                />
              }
              label="Home Loan Options"
            />
          </div>

          <div className="mb-3">
            <FormControlLabel
              control={
                <Checkbox
                  checked={siteVisits}
                  onChange={handleSiteVisitsChange}
                />
              }
              label="Site Visits & Field Assistance"
            />
          </div>

          <div className="mb-3">
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAgreed}
                  onChange={handleTermsAgreedChange}
                />
              }
              label={
                <span>
                  I agree to the{" "}
                  <Link
                    className="text-success text-decoration-underline"
                    to="/terms"
                    target="_blank"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-success text-decoration-underline"
                    to="/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </div>
          </div>
          </div>
          </div>
         

          {/* Property Selection (if from developer profile) */}
          <div className="form-group mb-3" hidden={!fromDeveloperProfile}>
            <label className="form-label fw-bold">Select Property*</label>
            <select
              className="form-select"
              value={values.propertyId}
              onChange={handleChange}
              onBlur={handleBlur}
              name="propertyId"
            >
              <option value="">Select Property</option>
              {propertyList?.map((property) => (
                <option value={property._id} key={property._id}>
                  {property.propertyTitle}
                </option>
              ))}
            </select>
            <ShowError
              touched={touched.propertyId}
              message={errors.propertyId}
            />
          </div>

          {/* OTP Field */}
          <div className="form-group mb-3" hidden={!isOtpSent}>
            <label className="form-label fw-bold">Enter OTP*</label>
            <input
              className="form-control w-50 border-2"
              maxLength={6}
              type="tel"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleNumberOnly}
            />
          </div>

          {/* Checkboxes */}
     
          

          {/* Submit and Cancel Buttons */}
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            <button
              type="button"
              className="btn btn-secondary px-4 py-2"
              onClick={handleClose}
              disabled={loader}
              style={{
                minHeight: '48px', // Better touch target
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
            {loader ? (
              <div className="text-center">
                <OnClickLoader />
              </div>
            ) : (
              <Tooltip
                title={!termsAgreed ? "Please agree to terms and conditions" : ""}
                arrow
                slotProps={{
                  tooltip: {
                    sx: { fontSize: '14px', fontWeight: 600 }
                  }
                }}
              >
                <button
                  type="submit"
                  className="fl-btn-green px-4 py-2"
                  disabled={!termsAgreed}
                  style={{
                    minHeight: '48px', // Better touch target
                    fontSize: '16px'
                  }}
                >
                  Submit
                </button>
              </Tooltip>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PropertyInquiryModal;
