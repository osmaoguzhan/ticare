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

export default function Home() {
  const { t } = useTranslation("label");

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
          bgcolor: "rgb(78,115,223)",
          color: "text.primary",
        }}>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: {
              xs: "90%",
              md: "950px",
            },
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Grid item xs={12} md={6}>
            <Card style={{ borderRadius: "20px" }}>
              <CardMedia
                component={"img"}
                src={"/images/business.jpg"}
                height={"650px"}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mb: 2 }}>
            <Card sx={{ borderRadius: "20px" }}>
              <CardContent>
                <FontAwesomeIcon
                  icon={faBaby}
                  size='3x'
                  style={{ color: "rgb(78,115,223)" }}
                />
                <Typography
                  component={"div"}
                  color='text.secondary'
                  style={{ marginBottom: "10%" }}>
                  <Typography
                    variant='h6'
                    color='text.secondary'
                    fontFamily={"Nunito, sans-serif"}>
                    {t("easy").toUpperCase()}
                  </Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quae. Lorem ipsum dolor sit amet consectetur
                </Typography>
                <FontAwesomeIcon
                  icon={faTruckFast}
                  size='3x'
                  style={{ color: "rgb(78,115,223)" }}
                />
                <Typography
                  component={"div"}
                  color='text.secondary'
                  style={{ marginBottom: "10%" }}>
                  <Typography
                    variant='h6'
                    color='text.secondary'
                    fontFamily={"Nunito, sans-serif"}>
                    {t("fast").toUpperCase()}
                  </Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quae. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet
                </Typography>
                <FontAwesomeIcon
                  icon={faCreativeCommonsNcEu}
                  size='3x'
                  style={{ color: "rgb(78,115,223)" }}
                />
                <Typography
                  component={"div"}
                  color='text.secondary'
                  style={{ marginBottom: "10%" }}>
                  <Typography
                    variant='h6'
                    color='text.secondary'
                    fontFamily={"Nunito, sans-serif"}>
                    {t("free").toUpperCase()}
                  </Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quae. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet
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
