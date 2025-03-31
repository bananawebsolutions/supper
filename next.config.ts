import type { NextConfig } from "next";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "cdn.sanity.io" },
            { protocol: "https", hostname: "lh3.googleusercontent.com" },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "./"),
        };

        return config;
    },
};

export default nextConfig;
