import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function generateCouponCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const AddCouponModal = ({ show, onClose, onAdd }) => {
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Active");
  const [expiryDate, setExpiryDate] = useState(null);

  const handleGenerate = () => {
    setCode(generateCouponCode());
  };

  const handleSave = () => {
    if (!code || !discount || !expiryDate) return;
    onAdd({ code, discount, status, expiryDate: expiryDate.format("YYYY-MM-DD") });
    setDiscount(0);
    setCode("");
    setStatus("Active");
    setExpiryDate(null);
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Add Coupon</h2>
        <TextField
          label="Discount (%)"
          type="number"
          fullWidth
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            label="Coupon Code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <Button variant="outlined" onClick={handleGenerate}>
            Generate
          </Button>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiry Date"
            value={expiryDate}
            onChange={setExpiryDate}
            minDate={dayjs()}
            slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCouponModal; 