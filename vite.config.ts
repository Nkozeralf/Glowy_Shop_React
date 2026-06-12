import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // ← Importante: usa rutas relativas
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generar archivos sin module type problemático
    modulePreload: false,
    rollupOptions: {
      output: {
        // Formato más compatible
        format: 'iife', // ← Cambia a IIFE en lugar de ES module
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})