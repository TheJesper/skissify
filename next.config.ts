import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: [
    "@libsql/client",
    "@prisma/adapter-libsql",
    "@prisma/client",
    "@auth/prisma-adapter",
  ],
  webpack: (config, { webpack }) => {
    // Fix for WasmHash crash on Node.js v22 (xxhash64 wasm unavailable)
    config.output.hashFunction = "xxhash64";
    // Suppress crypto fallback errors
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules/ },
    ];
    return config;
  },
};

export default nextConfig;
