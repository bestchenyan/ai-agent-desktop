import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import pkg from './package.json'
import { getExternalPkgs } from './scripts/getExternalPkgs'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
      lib: {
        entry: './src/main/index.ts'
      },
      rollupOptions: {
        output: {
          manualChunks(id): string | void {
            // IMPORTANT: can't change the name of the chunk, avoid private key leak
            if (id.includes('app_private')) {
              return 'app_private'
            }
          }
        }
      }
    },
    plugins: [
      tsconfigPaths(),
      externalizeDepsPlugin({
        include: [...getExternalPkgs()]
      }),
      {
        name: 'native-node-module-path',
        enforce: 'pre',
        resolveId(source) {
          if (source.includes('screencapturepermissions.node')) {
            return {
              id: '@computer-use/mac-screen-capture-permissions/build/Release/screencapturepermissions.node',
              external: true
            }
          }
          return null
        }
      }
    ]
  },
  preload: {
    build: {
      outDir: 'dist/preload',
      lib: {
        entry: './src/preload/index.ts'
      }
    },
    plugins: [tsconfigPaths()]
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
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    define: {
      APP_VERSION: JSON.stringify(pkg.version)
    }
  }
})
