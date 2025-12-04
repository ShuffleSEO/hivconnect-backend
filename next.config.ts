import { withPayload } from '@payloadcms/next/withPayload'
import webpack from 'webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Ignore problematic modules for Cloudflare Workers
    webpackConfig.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    )

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
