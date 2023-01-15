import { Box } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Activate = ({ success, message }) => {
  const { t } = useTranslation("label");
  const router = useRouter();

  useEffect(() => {
    if (success) {
      Swal.fire({
        text: message,
        confirmButtonText: t("signIn"),
        icon: "success",
        html: `${message}`,
        allowOutsideClick: false,
      }).then(() => router.replace("/auth/signin"));
    } else {
      Swal.fire({
        html: message,
        icon: "error",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "98vh",
        bgcolor: "primary",
      }}
    />
  );
};

export default Activate;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ locale, params }) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/activate`,
    {
      method: "POST",
      headers: { locale },
      body: params.id,
    }
  );
  const result = await response.json();
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
      success: result.success,
      message: result.message,
    },
  };
};
