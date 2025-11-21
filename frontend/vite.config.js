import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Don't inline assets, keep video as separate file
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep video files with original names
          if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
            return 'assets/[name].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  }
})
