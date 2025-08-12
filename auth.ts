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
      from: "no-reply@registrosupper.store",
      sendVerificationRequest: async (params) => {
        await sendVerificationRequest(params);
      },
    }),
  ],
  adapter: FirestoreAdapter(firestore),
});
