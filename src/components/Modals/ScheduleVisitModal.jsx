import {
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Dialog,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  DialogActions,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getSlotsApi, requestVisitApi } from "@/ApiRoutes/BuyersApi";
import Collapse from "@mui/material/Collapse";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxWidth: "500px",
    width: "100%", // Ensure the dialog takes full width up to maxWidth
  },
}));

const TimeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.2),
  width: 100,
}));

export default function ScheduleVisitModal({
  openVisitModal,
  handleCloseModal,
  singleProperty,
  showSlots,
  setShowSlots,
  makeVisitRequest,
  loader,
}) {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("afternoon");
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const propertyId = singleProperty?._id;

  const handleTimeSelect = (event) => {
    setSelectedTime(event.currentTarget.value);
  };

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
      setSelectedTime("");
    }
  };

  const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #c4c4c4",
    borderRadius: ".5rem",
    padding: theme.spacing(1),
  }));

  const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    border: "none",
    borderRadius: ".5rem !important",
    width: "100% !important",
    display: "inline-block !important",
    "&.Mui-selected": {
      backgroundColor: "#00A76F",
      color: "white",
      width: 100,
      "&:hover": {
        backgroundColor: "#008B5D",
      },
    },
  }));

  const shouldDisableDate = (date) => {
    const day = dayjs(date).day(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  
    if (singleProperty?.daysAvailiblity === "Weekdays") {
      // Disable weekends
      return day === 0 || day === 6;
    } else if (singleProperty?.daysAvailiblity === "Weekends") {
      // Disable weekdays
      return day !== 0 && day !== 6;
    } else if (singleProperty?.daysAvailiblity === "Custom") {
      // Check if days array exists and has length
      if (Array.isArray(singleProperty.days) && singleProperty.days.length > 0) {
        // Convert custom days to day numbers
        const daysMap = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        };
        
        // Get the day numbers from the custom days
        const allowedDays = singleProperty.days.map(day => daysMap[day]);
        
        // Disable days that are not in the allowedDays array
        return !allowedDays.includes(day);
      } else {
        // If the days array is empty or not provided, enable all days
        return false;
      }
    }
  
    return false; // By default, don't disable the date
  };
  

  const fetchSlots = async () => {
    try {
      const response = await getSlotsApi(propertyId, {
        selectDate: selectedDate,
      });
      setSlots(response.data.slots);
      setShowSlots(true);
    } catch (err) {
      toast.error("Unable to fetch slots for the selected date");
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const filteredSlots = slots?.filter((slot) => {
    const hour = parseInt(slot.slot.split(":")[0]);
    if (selectedPeriod === "morning") {
      return hour >= 8 && hour < 12;
    } else if (selectedPeriod === "afternoon") {
      return hour >= 12 && hour < 18;
    } else if (selectedPeriod === "evening") {
      return hour >= 18 && hour < 21;
    }
    return false;
  });

  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!openVisitModal) {
      setSelectedDate(null);
      setSelectedTime("");
      setSelectedPeriod("afternoon");
    }
  }, [openVisitModal]);

  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openVisitModal}
        disableScrollLock
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: "#00A76F", backgroundColor: "#F4F6F8" }}
          id="customized-dialog-title"
        >
          Schedule your FREE visit today
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="px-md-4 border-0">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                className="mb-3 text-black fw-semi-bold"
              >
                Select Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  minDate={dayjs(new Date())}
                  shouldDisableDate={shouldDisableDate}
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  format="DD-MM-YYYY"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Collapse in={showSlots}>
              <Grid item xs={12} className="ps-3 mt-3 mb-3">
                <Typography
                  variant="subtitle1"
                  className="text-black fw-semi-bold mb-2"
                >
                  Select Preferred Time
                </Typography>
                <CustomToggleButtonGroup
                  value={selectedPeriod}
                  exclusive
                  onChange={handlePeriodChange}
                  aria-label="Preferred Time"
                  className="p-2"
                >
                  <CustomToggleButton value="morning" aria-label="Morning">
                    Morning
                  </CustomToggleButton>
                  <CustomToggleButton value="afternoon" aria-label="Afternoon">
                    Afternoon
                  </CustomToggleButton>
                  <CustomToggleButton value="evening" aria-label="Evening">
                    Evening
                  </CustomToggleButton>
                </CustomToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="center">
                  {filteredSlots?.map((slot) => (
                    <Grid item key={slot.slot}>
                      <Tooltip
                        title={
                          !slot.available
                            ? "This Slot is not available for selected date"
                            : ""
                        }
                        arrow
                      >
                        <span>
                          <TimeButton
                            variant={
                              selectedTime === slot.slot ? "contained" : "text"
                            }
                            onClick={handleTimeSelect}
                            value={slot.slot}
                            disabled={!slot.available}
                            size="small"
                          >
                            {formatTime(slot.slot)}
                          </TimeButton>
                        </span>
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </DialogContent>
        <DialogActions className="px-3 px-md-4 mb-3">
          <Button
            onClick={() => makeVisitRequest(selectedTime, selectedDate)}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2.5 }}
            disabled={!selectedTime || loader}
          >
            <Typography variant="subtitle1" className="fw-bold text-white">
              {" "}
              Schedule Visit{" "}
            </Typography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
