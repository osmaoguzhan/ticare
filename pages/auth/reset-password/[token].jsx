import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthLayout from "@/components/layouts/AuthLayout";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm";

const ResetPassword = ({ userid, token }) => {
  return <ResetPasswordForm userid={userid} token={token} />;
};

export const getServerSideProps = async (ctx) => {
  const prisma = require("@/lib/prismaConnector").default;
  const response = await prisma.resetPasswordTokens.findUnique({
    where: { token: ctx.params.token },
    select: { userId: true, expireDatetime: true, isUsed: true },
  });
  if (
    !response?.userId ||
    response?.isUsed ||
    response.expireDatetime < new Date()
  )
    return { redirect: { destination: `/auth/signin`, permanent: false } };
  return {
    props: {
      token: ctx.params.token,
      userid: response.userId,
      ...(await serverSideTranslations(ctx.locale ?? "gb", ["label", "error"])),
    },
  };
};

ResetPassword.Layout = AuthLayout;

export default ResetPassword;
