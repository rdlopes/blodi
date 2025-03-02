import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from 'vite'
import mkCert from 'vite-plugin-mkcert'
import {litStyleLoader, litTemplateLoader} from '@mordech/vite-lit-loader';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/blodi/',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    mkCert(),
    litStyleLoader(),
    litTemplateLoader(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: 'blodi',
        short_name: 'blodi',
        description: 'blodi',
        theme_color: '#ffffff',
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        sourcemap: true,
        maximumFileSizeToCacheInBytes: 6_000_000,
      },
      devOptions: {
        disableRuntimeConfig: process.env.NODE_ENV === 'development',
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
      workbox: {
        sourcemap: true
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lit', 'lit-html'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "global-builtin",
          "mixed-decls",
          "color-functions",
        ]
      }
    }
  },
})
