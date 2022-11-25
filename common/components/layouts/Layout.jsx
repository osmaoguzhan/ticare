import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCogs,
  faCubes,
  faDashboard,
  faEuro,
  faStore,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/MainPageNavbar";
import { Avatar, Grid } from "@mui/material";

const drawerWidth = 240;

export default function PermanentDrawerLeft({ children }) {
  const menuItems = [
    { text: "Dashboard", icon: faDashboard },
    { text: "Brands", icon: faTags },
    { text: "Stores", icon: faStore },
    { text: "Orders", icon: faEuro },
    { text: "Products", icon: faCubes },
    { text: "Settings", icon: faCogs },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        elevation={4}
        position='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white",
          color: "black",
        }}>
        <Toolbar>
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-end"}
            alignContent={"center"}>
            <Grid item margin={3}>
              <Typography
                variant='h6'
                noWrap
                component='h6'
                fontSize={"18px"}
                color={"gray"}>
                Oğuzhan Osma
              </Typography>
            </Grid>
            <Grid item margin={2}>
              <Avatar sx={{ width: 48, height: 48 }}>
                <Box
                  component={"img"}
                  alt={"ppicture"}
                  src={"https://picsum.photos/200"}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Avatar>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(78,115,223)",
            color: "white",
          },
        }}
        variant='permanent'
        anchor='left'>
        {/* <Toolbar /> */}
        <List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Box
              sx={{
                mr: 1,
                rotate: "-14deg",
                color: "#f8f8f8e6",
              }}>
              <FontAwesomeIcon
                icon={faBoxOpen}
                size='3x'
                style={{ cursor: "pointer" }}
                onClick={() => router.replace("/")}
              />
            </Box>
            <Typography
              variant='h6'
              noWrap
              component='h6'
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "Nunito, sans-serif",
                letterSpacing: ".2rem",
                color: "#f8f8f8e6",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textDecoration: "none",
              }}>
              TICARE
            </Typography>
          </Box>
        </List>
        <List>
          {menuItems.map(({ text, icon }) => (
            <ListItem key={text}>
              <ListItemButton>
                <FontAwesomeIcon icon={icon} />
                <ListItemText primary={text} sx={{ marginLeft: 1 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          backgroundColor: "#faf8f7",
          minHeight: "93vh",
        }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
