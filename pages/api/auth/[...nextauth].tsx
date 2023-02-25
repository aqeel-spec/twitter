import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { GoogleProfile } from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers";

// GOOLE_CLIENT_ID = 597313025214-9a4tbjhp4sj9oia1pkvrr638qir9ndvf.apps.googleusercontent.com;
// GOOGLE_CLEINT_SECRET = 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;

type ClientID = {
  cleintId: string;
  clientSecret: string;
};
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
};

export default NextAuth(authOptions);
