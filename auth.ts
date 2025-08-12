import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "./firebaseAdmin";
import { sendVerificationRequest } from "./src/lib/send-verification-request";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    EmailProvider({
      server: 465,
      from: "no-reply@registrosupper.store",
      sendVerificationRequest,
    }),
  ],
  adapter: FirestoreAdapter(firestore),
  session: {
    strategy: "database",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
