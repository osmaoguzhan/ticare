import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Grid,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Main from "@/components/Main";
import Constants from "@/utils/Constants";
import { useSession } from "next-auth/react";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 245px)`,
    marginLeft: `245px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
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
  const router = useRouter();
  const { data: session } = useSession();

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
                    {session?.user?.name.charAt(0).toUpperCase()}
                  </Box>
                )}
              </Avatar>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: "245px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "245px",
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
          {Constants.menuItems.map(({ key, icon }) => (
            <ListItem key={t(key)}>
              <ListItemButton onClick={() => router.push(`/${key}`)}>
                <FontAwesomeIcon icon={icon} fixedWidth color={"#f4f4f4"} />
                <ListItemText
                  primary={t(key)}
                  sx={{ marginLeft: 1, color: "#f4f4f4" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
};

export default ResponsiveSidebar;
