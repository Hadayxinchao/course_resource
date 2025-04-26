import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        withCredentials: true,
      },
      '/rails': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/active_storage': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
