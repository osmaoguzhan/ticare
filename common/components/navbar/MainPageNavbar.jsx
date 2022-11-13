import { faBoxOpen, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Button,
  darken,
} from "@mui/material";
import SelectLanguage from "../SelectLanguage";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const isHidden = {
    signin: router.pathname === "/auth/signin",
    signup: router.pathname === "/auth/signup",
  };

  return (
    <AppBar
      elevation={0}
      style={{
        backgroundColor: "rgb(78,115,223)",
      }}
      position={"static"}>
      {/* Toolbar */}
      <Container maxWidth={"xl"}>
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{
              mr: 1,
              rotate: "-14deg",
              color: "#f8f8f8e6",
            }}>
            <FontAwesomeIcon
              icon={faBoxOpen}
              size='2x'
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
              textDecoration: "none",
            }}>
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
            }}>
            <SelectLanguage />
            <Box
              sx={{
                mr: 1,
                display: isHidden.signin ? "none" : "flex",
              }}>
              <Button
                onClick={() => router.push("/auth/signin")}
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: darken("rgb(78,115,223)", 0.1),
                  },
                }}>
                {t("label:signIn")}
              </Button>
            </Box>
            <Box
              sx={{
                mr: 1,
                display: isHidden.signup ? "none" : "flex",
              }}>
              <Button
                onClick={() => router.push("/auth/signup")}
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: darken("rgb(78,115,223)", 0.1),
                  },
                }}>
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
              mr: 1,
            }}>
            <Box
              sx={{
                mr: 1,
              }}>
              <Button
                sx={{
                  color: "#f8f8f8e6",
                  ":hover": {
                    backgroundColor: darken("rgb(78,115,223)", 0.1),
                  },
                }}>
                <FontAwesomeIcon icon={faBars} size='2x' />
              </Button>
              {/* <Menu anchorEl={null} open={true}>
             <MenuItem>Signin</MenuItem>
             <MenuItem>Signup</MenuItem>
           </Menu> */}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
