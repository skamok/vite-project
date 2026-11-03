import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Подпуть приложения задаётся при сборке переменной BASE_PATH
// (в Dokploy: Environment → Build-time Arguments, например BASE_PATH=/tanstackstart).
// Не задана или "/" — приложение работает в корне домена.
// TanStack Start берёт basepath роутера из `base` автоматически.
const basePath = (process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '')
const BASE = basePath ? `/${basePath}/` : '/'

const config = defineConfig({
  base: BASE,
  // Клиентские файлы кладём в dist/client/<подпуть>/, чтобы структура папок
  // совпадала с URL (/<подпуть>/assets/...) и srvx --static отдавал их как есть.
  environments: {
    client: { build: { outDir: `dist/client${BASE}` } },
  },
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
})

export default config
