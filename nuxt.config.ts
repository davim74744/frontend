// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/fonts', '@nuxt/icon'], // Add @nuxt/icon if not already present
  css: ['~/assets/css/main.css'],
  
  ui: {
    prefix: 'Nuxt' // Custom prefix for Nuxt UI components (e.g., <NuxtButton> instead of <UButton>)
  },
  
 fonts: {
    families: [
      { name: 'Arial', provider: 'none' }
    ],
    defaults: {
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin']
    }
  },
  icon: {
    serverBundle: {
    collections: ['mdi', 'lucide', 'uil', 'cib']
      
    },
  }

});