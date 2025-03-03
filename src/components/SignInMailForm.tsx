"use client";

import { sendLink } from "@/server/actions/resend-login-action";
import React, { useActionState, useTransition } from "react";

const DEFAULT_STATE_ACTION = {
    success: "",
    error: "",
};

const SignInMailForm = () => {
    const [state, formAction] = useActionState(sendLink, DEFAULT_STATE_ACTION);
    const [isPending, startTransition] = useTransition();

    const submitAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData(e.currentTarget);
            formAction(formData);
        });
    };

    return (
        <div className="flex flex-col gap-3 mt-5">
            <h2 className="font-bold text-lg md:text-xl">
                Inicia sesión con correo electrónico
            </h2>
            <form onSubmit={submitAction}>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email-resend"
                        className="text-sm font-semibold tracking-wide"
                    >
                        Correo Electrónico{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="rounded-md px-3 py-3 placeholder:text-gray-300"
                        autoFocus
                        type="email"
                        id="email-resend"
                        required
                        name="email"
                        placeholder="jhon@mail.com"
                    />
                    {state?.error && (
                        <p className="text-red-500">{state.error}</p>
                    )}
                    {state?.success && (
                        <p className="text-green-500">{state.success}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primaryRed hover:bg-red-400 hoverEffect px-4 py-3 rounded-full text-white font-semibold mt-5 disabled:bg-primaryRed/80 disabled:cursor-not-allowed"
                    >
                        {isPending
                            ? "Enviando..."
                            : "Iniciar sesión o Registrarse"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignInMailForm;
