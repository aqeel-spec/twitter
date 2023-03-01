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
// (((( 1 ))))
// aqeelshahzad1215@gmail.com
//  clientId:"597313025214-9a4tbjhp4sj9oia1pkvrr638qir9ndvf.apps.googleusercontent.com",
//  clientSecret: "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",
// (((( ___ api key  ___  ))))
/*
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     apiKey: "AIzaSyAb3KJSok5qytnaHqB3YC7xD_F5pFIVp-8",
    authDomain: "twitter-clone-app-eaee9.firebaseapp.com",
    projectId: "twitter-clone-app-eaee9",
    storageBucket: "twitter-clone-app-eaee9.appspot.com",
    messagingSenderId: "597313025214",
    appId: "1:597313025214:web:b9f337672a6b9a7d9a9aef"
};
*/
// (((( 2 ))))
// shahbazmrasi788@gmail.com
//  clientId:"1053707131033-69qhnn69uc4di8q7p23a5db1rurcvbev.apps.googleusercontent.com",
//  clientSecret: "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",
// (((( ___ api key  ___  ))))
/*
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  apiKey: "AIzaSyDumtC6MwxKW0eNfdV_SG8flJo0Jl1n8Is",
  authDomain: "twitterv2-df4c4.firebaseapp.com",
  projectId: "twitterv2-df4c4",
  storageBucket: "twitterv2-df4c4.appspot.com",
  messagingSenderId: "1053707131033",
  appId: "1:1053707131033:web:95200917b970d8b7140008",
  measurementId: "G-ZL2W49JXPC"
};
*/
