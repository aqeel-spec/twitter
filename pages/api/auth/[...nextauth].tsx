import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { GoogleProfile } from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers";
import { Session } from "next-auth";
import { TokenSet } from "next-auth";

//

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId:
        "1053707131033-69qhnn69uc4di8q7p23a5db1rurcvbev.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.SECRET,

  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: TokenSet;
    }): Promise<Session> {
      session.user.username = session.user?.name
        ?.split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
