import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorize, NextAuthAdapter as Adapter } from "@zenstackhq/runtime/auth";
import service from "@zenstackhq/runtime";

export const authOptions: NextAuthOptions = {
  adapter: Adapter(service),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "Your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      authorize: authorize(service, true),
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub!,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
