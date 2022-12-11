import { getSession } from "next-auth/react";

export const redirect = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: `${process.env.NEXTAUTH_URL}/${ctx.locale}/dashboard`,
        permanent: false,
      },
    };
  }
  return null;
};
