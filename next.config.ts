import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files in out/, served by nginx (see Dockerfile). No Next
  // server runs in production.
  output: "export",
};

export default nextConfig;
