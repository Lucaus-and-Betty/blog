// vite.config.ts
import { defineConfig } from "file:///E:/personal-project/blog/node_modules/.pnpm/vite@5.2.12_@types+node@20.12.13_less@4.2.0/node_modules/vite/dist/node/index.js";
import { join } from "path";
import react from "file:///E:/personal-project/blog/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_vite@5.2.12_@types+node@20.12.13_less@4.2.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
var __vite_injected_original_dirname = "E:\\personal-project\\blog";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@myHooks": join(__vite_injected_original_dirname, "src/hooks"),
      "@myComponents": join(__vite_injected_original_dirname, "src/components"),
      "@myUtils": join(__vite_injected_original_dirname, "src/utils"),
      "@myStore": join(__vite_injected_original_dirname, "src/store"),
      "@myTypes": join(__vite_injected_original_dirname, "src/types"),
      "@myPages": join(__vite_injected_original_dirname, "src/pages"),
      "@myAssets": join(__vite_injected_original_dirname, "src/assets"),
      "@myConstants": join(__vite_injected_original_dirname, "src/constants")
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwZXJzb25hbC1wcm9qZWN0XFxcXGJsb2dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHBlcnNvbmFsLXByb2plY3RcXFxcYmxvZ1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcGVyc29uYWwtcHJvamVjdC9ibG9nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQG15SG9va3MnOiBqb2luKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpLFxuICAgICAgJ0BteUNvbXBvbmVudHMnOiBqb2luKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAnQG15VXRpbHMnOiBqb2luKF9fZGlybmFtZSwgJ3NyYy91dGlscycpLFxuICAgICAgJ0BteVN0b3JlJzogam9pbihfX2Rpcm5hbWUsICdzcmMvc3RvcmUnKSxcbiAgICAgICdAbXlUeXBlcyc6IGpvaW4oX19kaXJuYW1lLCAnc3JjL3R5cGVzJyksXG4gICAgICAnQG15UGFnZXMnOiBqb2luKF9fZGlybmFtZSwgJ3NyYy9wYWdlcycpLFxuICAgICAgJ0BteUFzc2V0cyc6IGpvaW4oX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpLFxuICAgICAgJ0BteUNvbnN0YW50cyc6IGpvaW4oX19kaXJuYW1lLCAnc3JjL2NvbnN0YW50cycpLFxuICAgIH1cbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIG1hdGg6IFwiYWx3YXlzXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUSxTQUFTLG9CQUFvQjtBQUM3UixTQUFTLFlBQVk7QUFDckIsT0FBTyxXQUFXO0FBRmxCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFlBQVksS0FBSyxrQ0FBVyxXQUFXO0FBQUEsTUFDdkMsaUJBQWlCLEtBQUssa0NBQVcsZ0JBQWdCO0FBQUEsTUFDakQsWUFBWSxLQUFLLGtDQUFXLFdBQVc7QUFBQSxNQUN2QyxZQUFZLEtBQUssa0NBQVcsV0FBVztBQUFBLE1BQ3ZDLFlBQVksS0FBSyxrQ0FBVyxXQUFXO0FBQUEsTUFDdkMsWUFBWSxLQUFLLGtDQUFXLFdBQVc7QUFBQSxNQUN2QyxhQUFhLEtBQUssa0NBQVcsWUFBWTtBQUFBLE1BQ3pDLGdCQUFnQixLQUFLLGtDQUFXLGVBQWU7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
