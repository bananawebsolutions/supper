import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import WhatsAppButton from "@/components/WhatsappButton";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Supper",
    description: "Tienda online de frutas, verduras y abarrotes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
            >
                <SessionProvider>
                    <Layout>
                        <Header />
                        {children}
                        <Footer />
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                style: {
                                    backgroundColor: "#000000",
                                    color: "#ffffff",
                                },
                            }}
                        />
                        <WhatsAppButton phoneNumber="525652588800" />
                    </Layout>
                </SessionProvider>
            </body>
        </html>
    );
}
