import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));
import million from "million/compiler";

jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2.cc0.wtf",
      },
    ],
  },
};

const millionConfig = {
  auto: {
    threshold: 0.05,
    skip: ["useBadHook", /badVariable/g], // default []
    rsc: true,
  },
};

export default million.next(nextConfig, millionConfig);
