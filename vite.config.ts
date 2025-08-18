
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set base to your repo name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/app-products/', // change if your repository is named differently
})
