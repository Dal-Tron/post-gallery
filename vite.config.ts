/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
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
