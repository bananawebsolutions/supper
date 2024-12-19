"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
    return (
        <button
            onClick={() => signOut()}
            className="border bg-gray-50 border-gray-400 px-8 py-2 text-sm font-semibold rounded-md hover:bg-gray-800 hover:text-white hoverEffect"
        >
            Cerrar Sesión
        </button>
    );
};

export default SignOutButton;
