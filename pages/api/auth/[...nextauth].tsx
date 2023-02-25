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
        "597313025214-9a4tbjhp4sj9oia1pkvrr638qir9ndvf.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },

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
