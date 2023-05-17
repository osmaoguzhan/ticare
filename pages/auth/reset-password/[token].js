import { Box, Card } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm";

const Signin = ({ userid, token }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "85vh",
        bgcolor: "primary.main",
      }}
    >
      <Card
        sx={{
          padding: 5,
          marginX: {
            xs: "15px",
            md: "0px",
          },
          border: "2px solid #f0eeeb",
          borderRadius: "30px",
        }}
      >
        <ForgotPasswordForm userid={userid} token={token} />
      </Card>
    </Box>
  );
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
  ) {
    return {
      redirect: {
        destination: `/auth/signin`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      token: ctx.params.token,
      userid: response.userId,
      ...(await serverSideTranslations(ctx.locale ?? "gb", ["label", "error"])),
    },
  };
};

Signin.Layout = AuthLayout;

export default Signin;
