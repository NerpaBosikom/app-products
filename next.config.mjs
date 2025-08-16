
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// IMPORTANT for GitHub Pages: basePath and assetPrefix must match your repo name
const repoName = 'app-products';

export default {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  images: {
    // GH Pages is static hosting, so disable Next Image optimization
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};
