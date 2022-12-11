import SigninForm from "@/components/forms/SigninForm";
import { Box, Card } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { signIn } from "next-auth/react";
import { encrypt } from "@/utils/helpers/cipher";
import useLoading from "@/hooks/useLoading";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Signin = () => {
  const { setLoading } = useLoading();
  const { t } = useTranslation("label");
  const router = useRouter();
  const { data: session } = useSession();
  const [_, setValue] = useLocalStorage("user", {});

  const handleOnSubmit = async (formData) => {
    setLoading(true);
    formData.password = encrypt(formData.password);
    const { ok, error } = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: JSON.stringify(formData.password),
      locale: router.locale,
    });
    if (ok) {
      setValue(session?.user);
      router.replace("/dashboard").then(() => setLoading(false));
    }
    if (error) {
      setLoading(false);
      Swal.fire({
        title: t("error"),
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
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
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "gb", ["label", "error"])),
    },
  };
};

Signin.Layout = AuthLayout;

export default Signin;
