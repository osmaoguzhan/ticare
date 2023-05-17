import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faCreativeCommonsNcEu } from "@fortawesome/free-brands-svg-icons";
import Navbar from "@/components/navbar/MainPageNavbar";
import Footer from "@/components/footer/Footer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTheme } from "@emotion/react";

export default function Home() {
  const { t } = useTranslation("label");
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "86vh",
          bgcolor: "primary.main",
          color: "text.primary",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: {
              xs: "90%",
              md: "950px",
            },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              mb: 2,
            }}
          >
            <Card
              sx={{
                borderRadius: "20px",
              }}
            >
              <CardMedia
                component={"img"}
                src={"/images/business.webp"}
                height={"250px"}
              />
              <CardContent>
                <FontAwesomeIcon
                  icon={faBaby}
                  size="3x"
                  style={{ color: theme.palette.primary.main }}
                />
                <Typography
                  component={"div"}
                  color={theme.palette.primary.text}
                  style={{ marginBottom: "5%" }}
                >
                  <Typography variant="h6">
                    {t("easy").toUpperCase()}
                  </Typography>
                  {t("easyDescription")}
                </Typography>
                <FontAwesomeIcon
                  icon={faTruckFast}
                  size="3x"
                  style={{ color: theme.palette.primary.main }}
                />
                <Typography
                  component={"div"}
                  color={theme.palette.primary.text}
                  style={{ marginBottom: "5%" }}
                >
                  <Typography variant="h6" color={theme.palette.primary.text}>
                    {t("fast").toUpperCase()}
                  </Typography>
                  {t("fastDescription")}
                </Typography>
                <FontAwesomeIcon
                  icon={faCreativeCommonsNcEu}
                  size="3x"
                  style={{ color: theme.palette.primary.main }}
                />
                <Typography
                  component={"div"}
                  color={theme.palette.primary.text}
                  style={{ marginBottom: "5%" }}
                >
                  <Typography variant="h6" color={theme.palette.primary.text}>
                    {t("free").toUpperCase()}
                  </Typography>
                  {t("freeDescription")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};
