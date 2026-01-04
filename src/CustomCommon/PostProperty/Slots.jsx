import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { convertTo12HourFormat, getTime } from "@/CustomServices/Constant";

function Slots({ formik, fromTime, toTime, setFromTime, setToTime }) {
  const minTime = dayjs().hour(7).minute(59).second(59);
  const maxTime = dayjs().hour(22).minute(0).second(0);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleFromTimeChange = (newValue) => {
    if (!newValue) return;
    if (newValue.isAfter(toTime)) {
      alert(`From time cannot be after ${convertTo12HourFormat(toTime)}`);
      setFromTime(null);
      return;
    }
    if (newValue.isAfter(maxTime) || newValue.isBefore(minTime)) {
      alert("Time must be between 8:00 AM and 10:00 PM");
      setFromTime(null);
      return;
    }
    setFromTime(newValue);
    setFieldValue("from", getTime(newValue));
  };

  const handleToTimeChange = (newValue) => {
    if (!newValue) return;
    if (newValue.isBefore(fromTime)) {
      alert(`To time cannot be before ${convertTo12HourFormat(fromTime)}`);
      setToTime(null);
      return;
    }
    if (newValue.isAfter(maxTime) || newValue.isBefore(minTime)) {
      alert("Time must be between 8:00 AM and 10:00 PM");
      setToTime(null);
      return;
    }
    setToTime(newValue);
    setFieldValue("to", getTime(newValue));
  };

  const { values, errors, touched, setFieldValue, handleChange } = formik;

  const handleDaySelection = (day) => {
    const selectedDays = values.days || [];
    if (selectedDays.includes(day)) {
      setFieldValue(
        "days",
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setFieldValue("days", [...selectedDays, day]);
    }
  };

  function daysAvailiblityChange(value) {
    setFieldValue("daysAvailiblity", value);
    if (value !== "Custom") {
      setFieldValue("days", []); // Reset days if not custom
    }
  }

  function handleAllDayChange(e) {
    setFieldValue("alldaysAvailable", e.target.checked);
    if (e.target.checked) {
      setFromTime(dayjs().hour(8).minute(0).second(0));
      setToTime(maxTime);
    }
  }

  return (
    <div className="row mb-5">
      <div className="col-xxl-12">
        <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
          <div className="row">
            <div className="col-xxl-12">
              <h4>Days Availability for Schedule Visit</h4>
              <div className="btn-frame my-4">
                <input
                  id="Weekdays"
                  className="toggle toggle-right"
                  name="daysAvailiblity"
                  value="Weekdays"
                  type="radio"
                  hidden
                  checked={values.daysAvailiblity === "Weekdays"}
                  onChange={(e) => daysAvailiblityChange(e.target.id)}
                />
                <label htmlFor="Weekdays" className="btn-pri right">
                  Weekdays (Mon-Fri)
                </label>
                <input
                  id="Weekends"
                  className="toggle toggle-right"
                  name="daysAvailiblity"
                  value="Weekends"
                  type="radio"
                  hidden
                  checked={values.daysAvailiblity === "Weekends"}
                  onChange={(e) => daysAvailiblityChange(e.target.id)}
                />
                <label htmlFor="Weekends" className="btn-pri right">
                  Weekends (Sat-Sun)
                </label>
                <input
                  id="Custom"
                  className="toggle toggle-left"
                  name="daysAvailiblity"
                  value="Custom"
                  type="radio"
                  hidden
                  checked={values.daysAvailiblity === "Custom"}
                  onChange={(e) => daysAvailiblityChange(e.target.id)}
                />
                <label htmlFor="Custom" className="btn-pri left">
                  Custom
                </label>
              </div>
            </div>

            {values.daysAvailiblity === "Custom" && (
              <div className="xxl-12">
                <div className="row">
                  {daysOfWeek.map((day, index) => (
                    <div key={index} className="col-sm-3">
                      <div
                        className={`${
                          values.days.includes(day)
                            ? "bg-border-light-green"
                            : "bg-border-light-grey"
                        } swtich-container mb-4`}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.days.includes(day)}
                              onChange={() => handleDaySelection(day)}
                              className="p-1"
                            />
                          }
                          label={day}
                          labelPlacement="start"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="col-xxl-6">
              <h4 className="mb-4">Time Availability</h4>
              <div className="row">
                <div className="col-md-6 col-12 mb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="From"
                      value={fromTime}
                      onChange={handleFromTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="from"
                          variant="outlined"
                          helperText="Select start time"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="To"
                      value={toTime}
                      onChange={handleToTimeChange}
                      disableScrollLock
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="to"
                          variant="outlined"
                          helperText="Select end time"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col-xxl-6">
              <h4 className="mb-4">&nbsp;</h4>
              <div
                className={` ${
                  values.alldaysAvailable
                    ? "bg-border-light-green"
                    : "bg-border-light-grey"
                }  swtich-container`}
              >
                <FormControlLabel
                  control={<Switch checked={values.alldaysAvailable} />}
                  label="All Day Available?"
                  labelPlacement="start"
                  onChange={(event) => handleAllDayChange(event)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slots;
