import { getSession } from "next-auth/react";

export const redirect = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: `${process.env.NEXTAUTH_URL}/${session?.user?.settings?.language}/dashboard`,
        permanent: false,
      },
    };
  }
  return null;
};
