"use server";
import { z } from "zod";
import { signIn } from "../../../auth";

type DEFAULT_STATE = {
    success: string;
    error: string;
};

const authSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
});

export const sendLink = async (
    formState: DEFAULT_STATE,
    formData: FormData
) => {
    const validated = authSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validated.success) {
        return <DEFAULT_STATE>{
            success: "",
            error: validated.error.errors[0]?.message,
        };
    }

    try {
        await signIn("resend", {
            email: validated.data.email,
            redirect: false,
            callbackUrl: "/",
        });

        return <DEFAULT_STATE>{
            error: "",
            success:
                "Se ha enviado un link a tu correo electrónico. Por favor, revisa que no esté en la bandeja de spam.",
        };
    } catch (error) {
        return <DEFAULT_STATE>{
            success: "",
            error: `Hubo un problema al enviar el link a tu correo electrónico: ${error}`,
        };
    }
};
