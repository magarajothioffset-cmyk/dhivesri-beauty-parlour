import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'image-upload-handler',
        configureServer(server) {
          // Serve public static files with URL decoding for spaces and ampersands
          server.middlewares.use((req, res, next) => {
            if (req.url && (req.method === 'GET' || req.method === 'HEAD')) {
              try {
                const decodedPath = decodeURIComponent(req.url.split('?')[0]);
                const filePath = path.resolve(__dirname, 'public', decodedPath.replace(/^\//, ''));
                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                  const ext = path.extname(filePath).toLowerCase();
                  const mimeTypes: Record<string, string> = {
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.svg': 'image/svg+xml',
                    '.webp': 'image/webp',
                  };
                  if (mimeTypes[ext]) {
                    const stat = fs.statSync(filePath);
                    res.writeHead(200, {
                      'Content-Type': mimeTypes[ext],
                      'Content-Length': stat.size,
                      'Cache-Control': 'public, max-age=3600',
                    });
                    if (req.method === 'HEAD') {
                      res.end();
                    } else {
                      fs.createReadStream(filePath).pipe(res);
                    }
                    return;
                  }
                }
              } catch {}
            }
            next();
          });

          server.middlewares.use('/api/upload-asset', (req, res) => {
            if (req.method === 'POST') {
              const chunks: Buffer[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', () => {
                try {
                  const body = Buffer.concat(chunks).toString();
                  const data = JSON.parse(body);
                  const fileName = data.filename;
                  const base64Data = data.base64.replace(/^data:image\/\w+;base64,/, '');
                  const buffer = Buffer.from(base64Data, 'base64');
                  const targetPath = path.resolve(__dirname, 'public', fileName);
                  fs.writeFileSync(targetPath, buffer);
                  const distDir = path.resolve(__dirname, 'dist');
                  if (fs.existsSync(distDir)) {
                    fs.writeFileSync(path.resolve(distDir, fileName), buffer);
                  }
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, path: `/${fileName}` }));
                } catch (e: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: e?.message || 'Upload failed' }));
                }
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
