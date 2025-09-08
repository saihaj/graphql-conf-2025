/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    relay: {
      src: './src',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
};

export default nextConfig;
