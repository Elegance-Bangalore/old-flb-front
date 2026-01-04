import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";

function TimeFilters({ state }) {
  const handleDaysChange = (e) => {
    const selectedDays = e.target.value;
    let newStartDate = state.startDate;
    let newEndDate = state.endDate;

    switch (selectedDays) {
      case "thisWeek":
        newStartDate = dayjs().startOf("week");
        newEndDate = dayjs().endOf("week");
        break;
      case "lastWeek":
        newStartDate = dayjs().subtract(1, "week").startOf("week");
        newEndDate = dayjs().subtract(1, "week").endOf("week");
        break;
      case "last7Days":
        newStartDate = dayjs().subtract(7, "days");
        newEndDate = dayjs();
        break;
      case "last30Days":
        newStartDate = dayjs().subtract(30, "days");
        newEndDate = dayjs();
        break;
      case "last90Days":
        newStartDate = dayjs().subtract(90, "days");
        newEndDate = dayjs();
        break;
      default:
        break;
    }

    state.updateFilters(selectedDays, newStartDate, newEndDate);
  };

  const handleStartDateChange = (newDate) => {
    state.updateFilters(state.days, newDate, state.endDate);
  };

  const handleEndDateChange = (newDate) => {
    state.updateFilters(state.days, state.startDate, newDate);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Time Filter</InputLabel>
            <Select
              label="Time Filter"
              value={state.days}
              onChange={handleDaysChange}
            >
              <MenuItem value="thisWeek">This Week</MenuItem>
              <MenuItem value="lastWeek">Last Week</MenuItem>
              <MenuItem value="last7Days">Last 7 Days</MenuItem>
              <MenuItem value="last30Days">Last 30 Days</MenuItem>
              <MenuItem value="last90Days">Last 90 Days</MenuItem>
            </Select>
          </FormControl>
        </DemoContainer>
      </div>
      <div className="col-md-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Start Date"
              value={state.startDate}
              onChange={handleStartDateChange}
              format="DD-MM-YYYY"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="col-md-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="End Date"
              value={state.endDate}
              onChange={handleEndDateChange}
              format="DD-MM-YYYY"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default TimeFilters;
