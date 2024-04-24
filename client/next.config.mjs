/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrite() {
        return [
            { 
                source: '/api',
                destination: 'localhost:3000',

            },
        ]
    }
};


export default nextConfig;
