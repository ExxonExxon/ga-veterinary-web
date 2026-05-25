import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        projects: 'projects.html',
        about: 'about.html',
        notFound: '404.html',
      }
    }
  },
  plugins: [
    {
      name: '404-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = decodeURIComponent(req.url);
          if (url.endsWith('.html') && url !== '/404.html') {
            const filePath = path.join(server.config.root || process.cwd(), url);
            if (!fs.existsSync(filePath)) {
              req.url = '/404.html';
            }
          }
          next();
        });
      },
    },
  ],
});
