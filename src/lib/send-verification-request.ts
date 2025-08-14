import { EmailTemplate } from "../components/EmailTemplate";
import getResend from "./getResend";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  expires: Date;
  provider: {
    from?: string;
    server?: string;
    id: string;
    name: string;
    type: string;
  };
  token: string;
  theme: unknown;
  request: Request;
}) {
  const resend = getResend();

  const { identifier: email, url, provider } = params;

  const from = provider.from || "no-reply@registrosupper.store";

  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: email,
      subject: "Inicio de sesión - Supper",
      react: EmailTemplate({ magicLink: url }),
    });

    if (error) {
      console.error("Email send error:", error);
      return;
    }
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Email send error:", error);
  }
}
