import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        // Future pages can be added here, e.g.:
        // products: 'products.html',
      }
    }
  }
});
