import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    build: {
      minify: mode === 'develpoment' ? 'esbuild' : 'terser',
      terserOptions: {
        compress: {
          drop_console: mode !== 'development',
        },
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
  });
};
