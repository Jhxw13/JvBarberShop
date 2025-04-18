import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['3c9ade46-9e63-479d-b20c-f311700a7d7b-00-xntjlqz8rx3q.spock.replit.dev', '2deac287-4265-4f48-855c-f8aabad1c0ae-00-2ba4eh3z24mzf.spock.replit.dev']
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})
