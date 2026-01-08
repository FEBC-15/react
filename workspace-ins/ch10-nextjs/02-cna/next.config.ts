import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/community/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'kqwlp0fc-3000.asse.devtunnels.ms',
        'localhost:3000'
      ]
    }
  }
};

export default nextConfig;
