import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { generateDeveloperSlug } from "@/CustomServices/Constant";

export default function RightDrawer({
  open,
  setOpen,
  singleDeveloperData,
  selectedLetter,
}) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 350, marginTop: "6rem" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="mx-3"
    >
      <div className="my-2 fl-bg-light-green py-2 px-2 border-raidus-10 d-flex align-items-center justify-content-between">
        <h3 className="mb-0">Developers: {selectedLetter}</h3>
        <RxCross2 size={30} onClick={() => setOpen(false)} style={{ cursor: "pointer" }} />
      </div>

      <List>
        {singleDeveloperData?.map((developer, index) => (
          <ListItem key={index} disablePadding className="my-2 fl-text-green-hover"> 
            <Link to={`/developer/${generateDeveloperSlug(developer?.companyName || developer?.fullname)}/${developer?._id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <ListItemText primary={developer?.companyName} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
