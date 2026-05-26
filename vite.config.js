import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Default to root so `npm run build && npm run preview` works locally.
  // GitHub Pages deploy script sets `--base=/portfolio/`.
  base: '/',
})