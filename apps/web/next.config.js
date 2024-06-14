/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/walkthrough",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.gov.bc.ca",
      },
    ],
  },
};
