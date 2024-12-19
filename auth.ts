import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "@/firebaseAdmin";
import { sendVerificationRequest } from "@/lib/send-verification-request";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Resend({
            from: "no-reply@registrosupper.store",
            sendVerificationRequest: async (params) => {
                await sendVerificationRequest(params);
            },
        }),
    ],
    adapter: FirestoreAdapter(firestore),
});
