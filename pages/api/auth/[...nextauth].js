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
        if (!user.isActivated)
          throw new Error(Messages[locale].pleaseCheckCredentials);
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token["user"] = {};
        token.user.id = user.id;
        token.user.email = user.email;
        token.user.name = user.name;
        token.user.surname = user.surname;
        token.user.role = user.role;
        token.user.settings = user.settings;
        token.user.company = await prisma.company.findUnique({
          where: { userId: user.id },
        });
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
