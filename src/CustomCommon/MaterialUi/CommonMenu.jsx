import React from "react";
import { Menu, MenuItem } from "@mui/material";

const CommonMenu = ({ anchorEl, open, handleClose, menuItems, ariaLabel }) => {
  return (
    <Menu
      id="common-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": ariaLabel,
      }}
      disableScrollLock
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CommonMenu;
