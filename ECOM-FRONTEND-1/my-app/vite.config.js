import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


console.log('=== VITE CONFIG IS RUNNING ===');
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  //  envDir: `../`,

  configResolved(config) {
    console.log('------------------------------------');
    console.log('Vite Project Root:', config.root);
    console.log('Searching for .env in:', path.resolve(config.root, '../'));
    console.log('------------------------------------')}
})
