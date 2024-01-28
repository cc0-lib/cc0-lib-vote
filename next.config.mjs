/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
