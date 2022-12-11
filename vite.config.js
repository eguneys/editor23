import { defineConfig } from 'vite'
import { blayout } from 'rollup-plugin-blayout'

export default defineConfig({

  plugins: [
    blayout()
  ]
})
