import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          utils: ['axios', 'react-hook-form', 'react-hot-toast']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  },
  define: {
    // Ensure proper environment variable handling
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
})