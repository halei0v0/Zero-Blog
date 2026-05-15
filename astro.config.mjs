import { defineConfig } from 'astro/config';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  site: 'https://your-site.vercel.app',
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  },
  integrations: [
    {
      name: 'post-images',
      hooks: {
        'astro:server:setup'({ server }) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/images/')) {
              const match = req.url.match(/^\/images\/(.+)$/);
              if (match) {
                const filename = match[1];
                const imagePath = path.join(process.cwd(), 'images', filename);
                
                if (fs.existsSync(imagePath)) {
                  const ext = path.extname(filename).toLowerCase();
                  const contentTypes = {
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.svg': 'image/svg+xml',
                    '.webp': 'image/webp',
                  };
                  
                  res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
                  fs.createReadStream(imagePath).pipe(res);
                  return;
                }
              }
            }
            
            if (req.url && req.url.startsWith('/post/')) {
              const match = req.url.match(/^\/post\/([^\/]+)\/(.+)$/);
              if (match) {
                const [, slug, filename] = match;
                const imagePath = path.join(process.cwd(), 'post', slug, filename);
                
                if (fs.existsSync(imagePath)) {
                  const ext = path.extname(filename).toLowerCase();
                  const contentTypes = {
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.svg': 'image/svg+xml',
                    '.webp': 'image/webp',
                  };
                  
                  res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
                  fs.createReadStream(imagePath).pipe(res);
                  return;
                }
              }
            }
            next();
          });
        }
      }
    }
  ]
});
