import * as React from "react";
import SignupForm from "@/components/forms/SignupForm";
import Navbar from "@/components/navbar/MainPageNavbar";
import { Box, Card } from "@mui/material";
import Footer from "@/components/footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Validator from "@/utils/validator/Validator";
import bcrypt from "bcryptjs";

export default function SignUp() {
  const { t } = useTranslation("label");
  const validator = Validator("signup");
  const handleOnSubmit = async (formData) => {
    formData.password = await bcrypt.hash(formData.password, 10);
    delete formData.passwordRepeat;
    const response = await fetch("/api/auth/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result);
    // .then((res) => {
    //   console.log((await res.json()));
    //   console.log("====================================");
    //   console.log("Account created successfully");
    //   console.log("====================================");
    // Swal.fire({
    //   title: "Success!",
    //   text: Messages.success.accountCreated,
    //   icon: "success",
    //   confirmButtonText: "OK",
    // }).then(() => router.replace("/auth/signin"));
    // })
    // .catch((err) => {
    //   console.log(err);
    //   console.log("====================================");
    //   console.log("Account creation failed");
    //   console.log("====================================");
    //   reset(
    //     {},
    //     {
    //       keepValues: false,
    //     }
    //   );
    // });
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
