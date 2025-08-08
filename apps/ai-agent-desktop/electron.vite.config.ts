import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
      lib: {
        entry: './src/main/index.ts'
      }
    },
    plugins: [tsconfigPaths(), externalizeDepsPlugin()]
  },
  preload: {
    build: {
      outDir: 'dist/preload',
      lib: {
        entry: './src/preload/index.ts'
      }
    },
    plugins: [tsconfigPaths(), externalizeDepsPlugin()]
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
    plugins: [react(), tailwindcss(), tsconfigPaths()]
  }
})
