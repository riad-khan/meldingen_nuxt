// https://v3.nuxtjs.org/api/configuration/nuxt.config


export default defineNuxtConfig({

    css: [

        '@/assets/css/normalize.css',
        '@/assets/css/style.css',
        '@/assets/css/responsive.css'
    ],


    axios: {
        baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
    },

    runtimeConfig: {
        public: {
            api: process.env.NUXT_API_URL,
            backend: process.env.NUXT_APP_LARAVEL_URL,
        }
    },
    ssr: true,


})
