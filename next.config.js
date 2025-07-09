/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from local network for mobile debugging
  allowedDevOrigins: [
    '192.168.100.212',
    '192.168.1.*',
    '192.168.0.*',
    '10.0.0.*',
    'localhost',
    '127.0.0.1'
  ],
  
  // Enable PWA features
  experimental: {
    webpackBuildWorker: true,
  },
  
  // Optimize for mobile debugging
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  
  // Enable source maps for debugging
  productionBrowserSourceMaps: false,
  
  // Custom webpack config for better mobile debugging
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};

module.exports = nextConfig;