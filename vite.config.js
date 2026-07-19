import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  root: 'src',
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        about: path.resolve(__dirname, 'src/about.html'),
        contact: path.resolve(__dirname, 'src/contact.html'),
        projects: path.resolve(__dirname, 'src/projects.html'),
        faq: path.resolve(__dirname, 'src/faq.html'),
        privacy: path.resolve(__dirname, 'src/privacy.html'),
        notFound: path.resolve(__dirname, 'src/404.html'),
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
