import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
"devDependencies": {
  "@vitejs/plugin-react": "^4.0.0",
  "vite": "^4.0.0"
}

export default defineConfig({
  plugins: [react()]
});
