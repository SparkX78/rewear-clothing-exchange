import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',               // ← use relative paths for all assets
  plugins: [react()],
  build: {
    outDir: 'docs',         // still output into docs/
    emptyOutDir: true
  }
})