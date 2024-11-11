/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
    // Add this to ensure proper chunk loading
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    }
}

module.exports = nextConfig 