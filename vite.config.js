import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Booking-System/',
  plugins: [react(), tailwindcss()],
  root: 'Client',
  build: {
    outDir: 'dist'
  }
})