import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import PageTitle from "../PageTitle";
import { useSession } from "next-auth/react";

export default function MobileNavbar() {
  const { data: session } = useSession();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={toggleDrawer(true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem>
                <MenuBookIcon sx={{ mr: 1 }} />
                <ListItemText primary="Menu" />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton component="a" href={"/series"}>
                  <ListItemText primary={"Series"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href={"/user/bookmarks"}>
                  <ListItemText primary={"Bookmarks"} />
                </ListItemButton>
              </ListItem>
              {session?.user.userrole === "author" && (
                <ListItem disablePadding>
                  <ListItemButton component="a" href={"/author/my-novels"}>
                    <ListItemText primary={"My Novels"} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
      <PageTitle variant={"h5"} mr={2} flexGrow={1} />
    </>
  );
}
