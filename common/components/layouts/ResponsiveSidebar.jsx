import { styled, useTheme } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faBars,
  faBoxOpen,
  faChevronLeft,
  faCogs,
  faCubes,
  faDashboard,
  faEuro,
  faStore,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import useScreen from "@/hooks/useScreen";
import { useState, useEffect } from "react";
import { Avatar, Grid } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Main from "../Main";
import Footer from "../footer/Footer";

const drawerwidth = 245;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    marginLeft: `${drawerwidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ResponsiveSidebar = ({ ppicture, children }) => {
  const { width } = useScreen();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { t } = useTranslation("label");
  const menuItems = [
    {
      key: "dashboard",
      text: t("dashboard"),
      icon: faDashboard,
      link: "/dashboard",
    },
    { key: "brands", text: t("brands"), icon: faTags, link: "/brands" },
    { key: "stores", text: t("stores"), icon: faStore, link: "/stores" },
    { key: "orders", text: t("orders"), icon: faEuro, link: "/orders" },
    { key: "products", text: t("products"), icon: faCubes, link: "/products" },
    { key: "settings", text: t("settings"), icon: faCogs, link: "/settings" },
  ];

  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cb = useCallback(() => setOpen(width > 600), [width]);

  useEffect(() => {
    cb();
  }, [cb]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='fixed' open={open}>
        <Toolbar sx={{ backgroundColor: "#fff" }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}>
            <FontAwesomeIcon
              icon={faBars}
              color={"rgb(78,115,223)"}
              fixedWidth
            />
          </IconButton>
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-end"}
            alignContent={"center"}>
            <Grid item margin={2}>
              <Avatar sx={{ width: 48, height: 48 }}>
                {ppicture ? (
                  <Box
                    component={"img"}
                    alt={"ppicture"}
                    src={ppicture}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <Box
                    component={"div"}
                    sx={{
                      cursor: "pointer",
                    }}>
                    {" "}
                    O{" "}
                  </Box>
                )}
              </Avatar>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerwidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerwidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(78,115,223)",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}>
        <DrawerHeader>
          <Grid container>
            <Grid item xs={10}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}>
                <Box
                  sx={{
                    rotate: "-14deg",
                    color: "#f8f8f8e6",
                  }}>
                  <FontAwesomeIcon icon={faBoxOpen} size='3x' fixedWidth />
                </Box>
                <Typography
                  variant='h6'
                  noWrap
                  component='h6'
                  sx={{
                    mr: 2,
                    mt: 0.6,
                    display: "flex",
                    fontFamily: "Nunito, sans-serif",
                    letterSpacing: ".2rem",
                    color: "#f8f8f8e6",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}>
                  TICARE
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  mt: 2,
                  color: "#e1dfe1",
                  ":hover": { backgroundColor: "rgb(78,118,223)" },
                }}>
                {theme.direction === "ltr" ? (
                  <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
                ) : (
                  <FontAwesomeIcon icon={faBars} fixedWidth />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </DrawerHeader>
        <List>
          {menuItems.map(({ text, icon, link }) => (
            <ListItem key={text}>
              <ListItemButton onClick={() => router.push(link)}>
                <FontAwesomeIcon icon={icon} fixedWidth color={"#f4f4f4"} />
                <ListItemText
                  primary={text}
                  sx={{ marginLeft: 1, color: "#f4f4f4" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} drawerwidth={drawerwidth}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
};

export default ResponsiveSidebar;
