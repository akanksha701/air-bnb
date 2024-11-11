/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dfm6prn5y/**',
            },
        ],
    },
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