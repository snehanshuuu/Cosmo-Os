// vite.config.ts
import { defineConfig } from "file:///C:/Users/sneha/OneDrive/Documents/Snehanshu%20stuffs/VesArchives/COSMO%20OS/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/sneha/OneDrive/Documents/Snehanshu%20stuffs/VesArchives/COSMO%20OS/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\sneha\\OneDrive\\Documents\\Snehanshu stuffs\\VesArchives\\COSMO OS";
var vite_config_default = defineConfig({
  base: "./",
  // Ensures assets load correctly on all deployment targets (Vercel, Netlify, GitHub Pages, Render)
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react"],
          "vendor-zustand": ["zustand"],
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzbmVoYVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcU25laGFuc2h1IHN0dWZmc1xcXFxWZXNBcmNoaXZlc1xcXFxDT1NNTyBPU1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc25laGFcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXFNuZWhhbnNodSBzdHVmZnNcXFxcVmVzQXJjaGl2ZXNcXFxcQ09TTU8gT1NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3NuZWhhL09uZURyaXZlL0RvY3VtZW50cy9TbmVoYW5zaHUlMjBzdHVmZnMvVmVzQXJjaGl2ZXMvQ09TTU8lMjBPUy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy4vJywgLy8gRW5zdXJlcyBhc3NldHMgbG9hZCBjb3JyZWN0bHkgb24gYWxsIGRlcGxveW1lbnQgdGFyZ2V0cyAoVmVyY2VsLCBOZXRsaWZ5LCBHaXRIdWIgUGFnZXMsIFJlbmRlcilcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICd2ZW5kb3ItcmVhY3QnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgICd2ZW5kb3ItbW90aW9uJzogWydmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgJ3ZlbmRvci1pY29ucyc6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgICAgICAgJ3ZlbmRvci16dXN0YW5kJzogWyd6dXN0YW5kJ10sXG4gICAgICAgICAgJ3ZlbmRvci10aHJlZSc6IFsndGhyZWUnLCAnQHJlYWN0LXRocmVlL2ZpYmVyJywgJ0ByZWFjdC10aHJlZS9kcmVpJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlosU0FBUyxvQkFBb0I7QUFDeGIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUE7QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUNyQyxpQkFBaUIsQ0FBQyxlQUFlO0FBQUEsVUFDakMsZ0JBQWdCLENBQUMsY0FBYztBQUFBLFVBQy9CLGtCQUFrQixDQUFDLFNBQVM7QUFBQSxVQUM1QixnQkFBZ0IsQ0FBQyxTQUFTLHNCQUFzQixtQkFBbUI7QUFBQSxRQUNyRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
