/** @type {import('next').NextConfig} */
const nextBuildId = require("next-build-id");
const nextConfig = {
    experimental: {
        scrollRestoration: true,
        swcMinify: false,
        appDir:true
    },
    trailingSlash: true,
    assetPrefix: process.env.BASE_PATH || '',
    basePath: process.env.BASE_PATH || '',
    output: 'export',
    generateBuildId: async () => {
      return nextBuildId({ dir: __dirname });
    }
}

module.exports = nextConfig
