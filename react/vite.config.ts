import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  build: { 
    target: 'esnext',
    emptyOutDir: true,
    outDir: '../public',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
});
