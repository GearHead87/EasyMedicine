/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['fs', 'bcrypt', '@prisma/client'],
	},
	// webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = {
			fs: false,
			bcrypt: false,
			child_process: false,
			tls: false,
			net: false,
			nock: false,
		};
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: '',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
