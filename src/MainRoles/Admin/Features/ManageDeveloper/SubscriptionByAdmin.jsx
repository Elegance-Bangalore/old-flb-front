import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { subscriptionPlanListApi } from "@/ApiRoutes/SellerApis";
 
function SubscriptionByAdmin({ formik }) {
  const { values, setFieldValue } = formik;
  const [planList, setPlanList] = useState([]);

 
  const handleDateChange = (newValue) => {
    if (newValue) {
      const formattedDate = dayjs(newValue).format("DD-MM-YYYY");
      setFieldValue("expiryDate", formattedDate);
    }
  };
 
  async function subscriptionPlanList() {
    try {
      const response = await subscriptionPlanListApi();
      setPlanList(response?.data?.data);
    } catch (error) {
      throw error;
    }
  }
 
  useEffect(() => {
    subscriptionPlanList();
  }, []);
 
  return (
    <div className="row my-5">
      <div className="col-md-6 mb-4">
        <div
          className={`${
            values.subscription
              ? "bg-border-light-green"
              : "bg-border-light-grey"
          } swtich-container`}
        >
          <FormControlLabel
            control={
              <Switch
                checked={values.subscription} // Directly using boolean value
                onChange={
                  (event) => setFieldValue("subscription", event.target.checked) // Updating the boolean value
                }
              />
            }
            label="Subscription"
            labelPlacement="start"
          />
        </div>
      </div>
 
      <div className="col-md-6 mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Subscription Expiry Date"
            format="MM/DD/YYYY"
            value={dayjs(values.expiryDate)}
            disabled={!values.subscription}
            onChange={handleDateChange}
            minDate={dayjs()}
          />
        </LocalizationProvider>
      </div>
 
      <div className="col-md-6">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Plan</InputLabel>
          <Select label="Select Plan" disabled={!values.subscription} value={values.plan} onChange={(e) => setFieldValue("plan", e.target.value)}>
            <MenuItem  key={values.plan}>Select Plan</MenuItem>
 
            {planList?.map((item) => (
              <MenuItem value={item?.planName} key={item?.planName}>{item?.planName + " - " + item?.monthlyPrice + " per month"}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
 
export default SubscriptionByAdmin;