import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/fresh-blog/',
  build: {
    outDir: 'docs'
  }
})