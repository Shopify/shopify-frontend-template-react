import { defineConfig } from 'vite'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

if (
  process.env.npm_lifecycle_event === 'build' &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n'
  )
}

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
}

const host = process.env.HOST
  ? process.env.HOST.replace(/https:\/\//, '')
  : undefined
const root = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  root,
  define: {
    'process.env.SHOPIFY_API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    port: process.env.FRONTEND_PORT,
    hmr: {
      protocol: host ? 'wss' : 'ws',
      host: host || 'localhost',
      port: process.env.FRONTEND_PORT,
      clientPort: 443,
    },
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    deps: {
      inline: ['@shopify/react-testing'],
    },
  },
})
