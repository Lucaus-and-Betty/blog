import { defineConfig } from 'vite'
import { join } from "path";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  resolve: {
    alias: {
      '@myHooks': join(__dirname, 'src/hooks'),
      '@myComponents': join(__dirname, 'src/components'),
      '@myUtils': join(__dirname, 'src/utils'),
      '@myStore': join(__dirname, 'src/store'),
      '@myTypes': join(__dirname, 'src/types'),
      '@myPages': join(__dirname, 'src/pages'),
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
})
