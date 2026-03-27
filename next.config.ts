import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    // Fix for WasmHash crash on Node.js v22 (xxhash64 wasm unavailable)
    // Fall back to md4 which uses Node's built-in crypto
    config.output.hashFunction = "md4";
    return config;
  },
};

export default nextConfig;
