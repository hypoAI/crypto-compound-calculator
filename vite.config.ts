import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use relative paths for local file access and GitHub Pages compatibility
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
  },
});
