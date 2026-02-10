import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      ...(wordpressHostname
        ? [
          {
            protocol: "https" as const,
            hostname: wordpressHostname,
            port: "",
            pathname: "/**",
          },
          {
            protocol: "http" as const,
            hostname: wordpressHostname,
            port: "",
            pathname: "/**",
          },
        ]
        : []),
      {
        protocol: "https" as const,
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/**",
      },
      // Allow localhost for development
      {
        protocol: "http" as const,
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http" as const,
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
    ],
    // Disable image optimization for local development
    unoptimized: process.env.NODE_ENV === "development",
  },
  async redirects() {
    if (!wordpressUrl) {
      return [];
    }
    return [
      {
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/animations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
