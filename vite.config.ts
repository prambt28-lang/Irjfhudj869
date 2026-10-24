import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Sandbox/preview awareness.
 *
 * BASE44_PREVIEW_MODE is supplied by the Base44 sandbox (value "1"). It only
 * relaxes the dev-server host check so the preview proxy can reach Vite with its
 * own sandbox hostname; with the flag unset (normal local development, CI, a
 * production build) nothing here changes behaviour.
 */
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN
const allowedHosts = previewMode && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Vite also appends the hosts from __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS.
    ...(allowedHosts ? { allowedHosts } : {}),
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
