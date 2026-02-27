import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  // Silenciamos el warning de múltiples lockfiles
  outputFileTracingRoot: path.join(__dirname, "../"),
};

export default nextConfig;
