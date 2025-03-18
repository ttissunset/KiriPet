import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 生产环境下启用打包分析
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 启用source map
    sourcemap: false,
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        // 删除console
        drop_console: true,
        // 删除debugger
        drop_debugger: true,
      }
    },
    // 代码分割策略
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          vue: ['vue', 'vue-router'],
          vendor: ['scrollreveal', 'vue3-smooth-scroll'],
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: 'assets/js/[name].[hash].js',
        // 用于代码块的打包输出格式
        chunkFileNames: 'assets/js/[name].[hash].js',
        // 用于资源的打包输出格式
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img';
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts';
          } else if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'media';
          } else if (/\.css$/.test(assetInfo.name)) {
            extType = 'css';
          }
          return `assets/${extType}/[name].[hash][extname]`;
        },
      },
    },
  },
});
