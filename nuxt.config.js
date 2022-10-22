// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
    css: [

        '@/assets/css/style.css',
        '@/assets/css/normalize.css',
        '@/assets/css/responsive.css'
    ],


    runtimeConfig: {
        public: {
            api: process.env.NUXT_API_URL
        }
    }


})
