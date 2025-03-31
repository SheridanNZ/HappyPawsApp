import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:9000',  // Proxy API requests to the backend
      '/images': 'http://localhost:9000'  // Proxy image requests to the backend
    }
  }
})
