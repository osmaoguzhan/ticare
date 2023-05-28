import SignupForm from "@/components/forms/auth/SignupForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Validator from "@/utils/validator/Validator";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";
import AuthLayout from "@/components/layouts/AuthLayout";
import { redirect } from "@/utils/helpers/redirect";

const SignUp = () => {
  const { t } = useTranslation("label");
  const validator = Validator("signup");
  const router = useRouter();
  const { setLoading } = useLoading();
  const handleOnSubmit = async (formData) => {
    setLoading(true);
    formData.password = await bcrypt.hash(formData.password, 10);
    delete formData.passwordRepeat;
    const response = await fetch("/api/auth/signup", {
      headers: {
        "Content-Type": "application/json",
        locale: router.locale,
      },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.success) {
      Swal.fire({
        title: t("success"),
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => router.replace("/auth/signin"));
    } else {
      Swal.fire({
        title: t("error"),
        text: result.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    setLoading(false);
  };
  return (
    <SignupForm handleOnSubmit={handleOnSubmit} t={t} validator={validator} />
  );
};

export const getServerSideProps = async (ctx) => {
  const shouldRedirect = await redirect(ctx);
  if (shouldRedirect) return shouldRedirect;
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? "gb", ["label", "error"])),
    },
  };
};

SignUp.Layout = AuthLayout;
export default SignUp;
