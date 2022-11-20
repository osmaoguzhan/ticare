import SigninForm from "@/components/forms/SigninForm";
import Navbar from "@/components/navbar/MainPageNavbar";
import Footer from "@/components/footer/Footer";
import { Box, Card } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import useLoading from "@/hooks/useLoading";

const Signin = () => {
  const { t } = useTranslation("label");
  const handleOnSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "85vh",
          bgcolor: "rgb(78,115,223)",
        }}>
        <Card
          sx={{
            padding: 5,
            border: "2px solid #f0eeeb",
            borderRadius: "30px",
          }}>
          <SigninForm handleOnSubmit={handleOnSubmit} t={t} />
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

export default Signin;
