import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  root: './www',
  build: {
    outDir: './dist',
    manifest: true,
  },
})
