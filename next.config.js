/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
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
        
        // Add both ignore-loader and explicit exclusion
        config.module.rules.push({
            test: /\.html$/,
            use: 'ignore-loader',
            exclude: /node_modules/
        });

        // Add specific exclusion for mapbox files
        config.module.rules.push({
            test: /node-pre-gyp/,
            use: 'ignore-loader'
        });
        
        // Add resolve fallback
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...config.resolve.fallback,
                fs: false,
                path: false,
            }
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