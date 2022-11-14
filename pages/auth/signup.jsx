import * as React from "react";
import SignupForm from "@/components/forms/SignupForm";
import Navbar from "@/components/navbar/MainPageNavbar";
import { Box, Card } from "@mui/material";
import Footer from "@/components/footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Validator from "@/utils/validator/Validator";
// import { useForm } from "react-hook-form";

export default function SignUp() {
  const { t } = useTranslation("label");
  const validator = Validator("signup");
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
          <SignupForm
            handleOnSubmit={handleOnSubmit}
            t={t}
            validator={validator}
          />
        </Card>
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
