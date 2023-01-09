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
  Menu,
  MenuItem,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxOpen,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import useScreen from "@/hooks/useScreen";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Main from "@/components/Main";
import Constants from "@/utils/Constants";
import { signOut, useSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";

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
    backgroundColor: "#fff",
  }),
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Layout = ({ children }) => {
  const { width } = useScreen();
  const [variant, setVariant] = useState("permanent");
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(null);
  const { t } = useTranslation("label");
  const router = useRouter();
  const { data: session } = useSession();
  const [_, setUser, clear] = useLocalStorage("user", session?.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = (key) => {
    setUserMenu(null);
    if (key === "logout") {
      clear("user");
      signOut({
        callbackUrl: `/${session?.user.settings.language}/auth/signin`,
      });
    } else if (key === "profile") {
      router.push("/profile");
    }
  };

  useEffect(() => {
    if (session?.user) {
      setUser(session?.user);
    }
  }, []);

  const cb = useCallback(() => {
    setOpen(width > 600);
    setVariant(width > 600 ? "permanent" : "temporary");
  }, [width]);

  useEffect(() => {
    cb();
  }, [cb]);

  return (
    <Box component={"div"} sx={{ display: "flex", overflowY: "hidden" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{ backgroundColor: "#fff", marginLeft: 0, marginRight: 0 }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
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
            alignContent={"center"}
          >
            <Grid item margin={2}>
              <Avatar
                sx={{ width: 48, height: 48, cursor: "pointer" }}
                onClick={handleOpenUserMenu}
              >
                <Box component={"div"}>
                  {session?.user?.name.charAt(0).toUpperCase()}
                </Box>
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
            backgroundColor: "rgb(78,115,223)",
          },
        }}
        variant={variant}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <Grid container>
            <Grid item xs={10}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    rotate: "-14deg",
                    color: "#f8f8f8e6",
                  }}
                >
                  <FontAwesomeIcon icon={faBoxOpen} size="3x" fixedWidth />
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="h6"
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
                  }}
                >
                  TICARE
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: { lg: "none", md: "none", sm: "none", xs: "block" },
              }}
            >
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  mt: 2,
                  color: "#e1dfe1",
                  ":hover": { backgroundColor: "rgb(78,118,223)" },
                }}
              >
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
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={userMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(userMenu)}
        onClose={handleCloseUserMenu}
      >
        {Constants.avatarOnClick.map(({ key, icon }) => (
          <MenuItem key={key} onClick={() => handleCloseUserMenu(key)}>
            <Grid container>
              <Grid item xs={10}>
                <Typography textAlign="center">{t(key)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <FontAwesomeIcon icon={icon} fixedWidth />
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Layout;
