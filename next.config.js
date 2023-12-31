/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ];
    },
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
        // TODO: Consider enabling modularizeImports for material when https://github.com/mui/material-ui/issues/36218 is resolved
        // '@mui/material': {
        //   transform: '@mui/material/{{member}}',
        // },
    },
    transpilePackages: ['@pqina/pintura', '@pqina/react-pintura'],
};

module.exports = nextConfig;
