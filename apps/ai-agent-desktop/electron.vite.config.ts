import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
      lib: {
        entry: './src/main/index.ts'
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      outDir: 'dist/preload',
      lib: {
        entry: './src/preload/index.ts'
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: 'src/renderer',
    build: {
      outDir: 'dist/renderer',
      rollupOptions: {
        input: {
          main: resolve('./src/renderer/index.html')
        }
      },
      minify: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
