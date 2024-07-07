/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['fs', 'bcrypt', '@prisma/client'],
	},
	// webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = { fs: false, bcrypt: false };
		return config;
	},
};

export default nextConfig;
