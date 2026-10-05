import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";
const config: NextConfig = {
  ...(staticExport ? { output: "export" } : {}),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: staticExport },
  poweredByHeader: false,
};

export default config;
