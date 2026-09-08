import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hassanalijunejo-personal-portfolio.hf.space',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
