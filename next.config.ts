import type { NextConfig } from "next";

const hostNames = ["i.pravatar.cc", "res.cloudinary.com"];

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: hostNames.map((hostname) => ({
            protocol: "https",
            hostname,
        })),
    },
};

export default nextConfig;
