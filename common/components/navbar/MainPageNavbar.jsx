import {
  faBoxOpen,
  faBars,
  faSignIn,
  faUserPlus,
  faContactCard,
  faContactBook,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Button,
  darken,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import SelectLanguage from "../inputs/SelectLanguage";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import useScreen from "@/hooks/useScreen";

const Navbar = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const theme = useTheme();
  const [userMenu, setUserMenu] = useState(null);
  const { width } = useScreen();

  const handleOpenUserMenu = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  const isHidden = {
    signin: router.pathname === "/auth/signin",
    signup: router.pathname === "/auth/signup",
    contact: router.pathname === "/contact",
  };

  useEffect(() => {
    handleCloseUserMenu();
  }, [width]);

  return (
    <AppBar
      elevation={0}
      style={{
        backgroundColor: "primary.main",
      }}
      position={"static"}
    >
      {/* Toolbar */}
      <Container maxWidth={"xl"}>
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{
              mr: 1,
              rotate: "-14deg",
              color: "#f8f8f8e6",
            }}
          >
            <FontAwesomeIcon
              icon={faBoxOpen}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={() => router.replace("/")}
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="h6"
            sx={{
              mr: 2,
              display: "flex",
              letterSpacing: ".2rem",
              color: "#f8f8f8e6",
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            TICARE
          </Typography>
          {/* Signin and Signup buttons */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <SelectLanguage />
            <Box
              sx={{
                mr: 1,
                display: isHidden.contact ? "none" : "flex",
              }}
            >
              <Button
                onClick={() => router.push("/contact")}
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: darken(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {t("label:contactUs")}
              </Button>
            </Box>
            <Box
              sx={{
                mr: 1,
                display: isHidden.signin ? "none" : "flex",
              }}
            >
              <Button
                onClick={() => router.push("/auth/signin")}
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: darken(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {t("label:signIn")}
              </Button>
            </Box>
            <Box
              sx={{
                mr: 1,
                display: isHidden.signup ? "none" : "flex",
              }}
            >
              <Button
                onClick={() => router.push("/auth/signup")}
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: darken(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {t("label:signUp")}
              </Button>
            </Box>
          </Box>
          {/* Responsive menu */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box>
              <Button
                sx={{
                  color: "#f8f8f8e6",
                  ":hover": {
                    backgroundColor: darken(theme.palette.primary.main, 0.1),
                  },
                }}
                onClick={handleOpenUserMenu}
              >
                <FontAwesomeIcon icon={faBars} size="2x" />
              </Button>
              <Menu
                anchorEl={userMenu}
                open={Boolean(userMenu)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/auth/signin");
                    handleCloseUserMenu();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSignIn}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />{" "}
                  {t("signIn")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/auth/signup");
                    handleCloseUserMenu();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />{" "}
                  {t("signUp")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/contact");
                    handleCloseUserMenu();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />{" "}
                  {t("contactUs")}
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
