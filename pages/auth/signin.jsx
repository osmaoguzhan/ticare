import SigninForm from "@/components/forms/auth/SigninForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getSession, signIn } from "next-auth/react";
import { encrypt } from "@/utils/helpers/cipher";
import useLoading from "@/hooks/useLoading";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import { redirect } from "@/utils/helpers/redirect";
import Constants from "@/utils/Constants";

const Signin = () => {
  const { setLoading } = useLoading();
  const { t } = useTranslation(["label", "error"]);
  const router = useRouter();

  const handleOnSubmit = async (formData) => {
    setLoading(true);
    formData.password = encrypt(formData.password);
    signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: JSON.stringify(formData.password),
      locale: router.locale,
    }).then(async (res) => {
      if (res.status !== 200) {
        setLoading(false);
        Swal.fire({
          title: t("error"),
          text: res.error,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        const session = await getSession();
        let path =
          session.user.role === Constants.ROLES.ADMIN
            ? `/admin/sales`
            : `/dashboard`;
        router
          .push(path, path, {
            locale: session.user.settings.language,
          })
          .then(() => setLoading(false));
      }
    });
  };
  return <SigninForm handleOnSubmit={handleOnSubmit} t={t} />;
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

Signin.Layout = AuthLayout;

export default Signin;
