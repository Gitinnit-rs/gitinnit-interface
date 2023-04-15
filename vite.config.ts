import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],

  // For @vueuse/sound (now removed) but still may be useful for other vueuse packages
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
});
