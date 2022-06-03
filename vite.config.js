import { defineConfig } from 'vite'

// prettier-ignore
const INDEX_ROUTE = "^/(\\?.*)?$";
const API_ROUTE = '^/api/'

if (
  process.env.npm_lifecycle_event === 'build' &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n'
  )
}

const root = new URL('.', import.meta.url).pathname
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
    middlewareMode: 'html',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 64999,
      clientPort: 64999,
    },
    proxy: {
      [INDEX_ROUTE]: {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        changeOrigin: false,
        secure: true,
        ws: false,
      },
      [API_ROUTE]: {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        changeOrigin: false,
        secure: true,
        ws: false,
      },
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
