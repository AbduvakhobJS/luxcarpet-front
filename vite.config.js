import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8001,
    strictPort: true,
    host: '0.0.0.0', // Faqat true emas, aynan 0.0.0.0 deb yozing
    cors: true,       // Brauzer bloklamasligi uchun
    allowedHosts: ["all"] // Vite 6+ versiyalarda bu muhim bo'lishi mumkin
  }
})
