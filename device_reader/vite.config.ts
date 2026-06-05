import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl()],
  server: {

    proxy: {

      "/gas": {

        target:

          "https://script.google.com",

        changeOrigin: true,

        secure: true,

        rewrite: (path) =>

          path.replace(

            /^\/gas/,

            ""

          )

      }

    },
    host: true
  }
})
