import { EmailTemplate } from "@/components/EmailTemplate";
import getResend from "./getResend";

interface VerificationRequestParams {
    identifier: string;
    provider: {
        from: string;
    };
    url: string;
}

export async function sendVerificationRequest(
    params: VerificationRequestParams
) {
    const resend = getResend();

    const {
        identifier: email,
        url,
        provider: { from },
    } = params;

    try {
        const { data, error } = await resend.emails.send({
            from: from,
            to: email,
            subject: "Inicio de sesión",
            react: EmailTemplate({ magicLink: url }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
