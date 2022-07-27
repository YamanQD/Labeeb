import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve("src/")
    },
  },
  // Important: https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
  build: {
    commonjsOptions: {
      "include": [/@labeeb\/core/]
    }
  },

  optimizeDeps: {
    include: ['@labeeb/core']
  }
})
