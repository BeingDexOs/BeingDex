import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compressPlugin from "vite-plugin-compression";
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compressPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [VantResolver(), ElementPlusResolver(), NaiveUiResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'src/assets/styles/base.less')}";`,
        javascriptEnabled: true,
      }
    }
  },
  esbuild: {
    pure: ["console.log"],
    drop: ['debugger']
  }
})
