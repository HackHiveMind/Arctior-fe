import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const backendTarget = 'http://127.0.0.1:3000'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    proxy: {
      '/api': backendTarget,
      '/upload': backendTarget,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: 'hidden',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
