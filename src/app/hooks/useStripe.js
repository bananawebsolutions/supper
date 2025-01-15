"use client";
import { useEffect } from "react";

const useStripe = () => {
    useEffect(() => {
        // Cargar Stripe.js en cada página
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
};

export default useStripe;
