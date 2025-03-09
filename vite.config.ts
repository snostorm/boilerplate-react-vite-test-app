import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // During development, we can proxy API requests to our Cloudflare Pages Functions
    proxy: {
      '/api': {
        target: 'http://localhost:8988',
        changeOrigin: true,
      }
    }
  }
})
