import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        projects: 'projects.html',
        about: 'about.html',
        // Future pages can be added here, e.g.:
        // products: 'products.html',
      }
    }
  }
});
