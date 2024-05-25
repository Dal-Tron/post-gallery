/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

import { dependencies } from './package.json'
function renderChunks(deps: Record<string, string>) {
  const chunks = {}
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies)
        }
      }
    }
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      exclude: [
        'postcss.config.mjs',
        'tailwind.config.mjs',
        'src/constants/**',
        'src/graphql/**',
        'src/icons/**',
        'src/scripts/**'
      ]
    }
  }
})
