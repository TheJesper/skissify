import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    // Fix for WasmHash crash on Node.js v22 (xxhash64 wasm unavailable)
    // md4 is also unavailable in OpenSSL 3 (Node.js v22+), fall back to sha256
    config.output.hashFunction = "sha256";
    return config;
  },
};

export default nextConfig;
