import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismaConnector";
import bcrypt from "bcryptjs";
import { decrypt } from "@/utils/helpers/cipher";
import { Messages } from "@/utils/Messages";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        let { email, password, locale } = credentials;
        password = decrypt(password);
        let user = await prisma.user.findUnique({ where: { email } });
        locale = locale ? locale : user.settings.language || "gb";
        if (!user) throw new Error(Messages[locale].pleaseCheckCredentials);
        let match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error(Messages[locale].pleaseCheckCredentials);
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      let sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      session._id = sessionUser.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
