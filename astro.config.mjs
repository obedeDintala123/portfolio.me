import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

export default defineConfig({
  site: "https://obede.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
})
