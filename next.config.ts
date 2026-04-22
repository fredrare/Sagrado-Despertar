import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const [owner, name] = repository.split("/");
const isUserOrOrgPage =
  !!name && name.toLowerCase() === `${owner?.toLowerCase()}.github.io`;
const onPages = process.env.GITHUB_ACTIONS === "true";
const basePath = onPages && name && !isUserOrOrgPage ? `/${name}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
