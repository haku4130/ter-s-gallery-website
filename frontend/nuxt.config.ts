export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    $development: {
        runtimeConfig: {
            public: {
                apiBase:
                    process.env.DEV_BASE_API_URL || 'http://localhost:8000',
            },
        },
    },

    $production: {
        runtimeConfig: {
            public: {
                apiBase:
                    process.env.PROD_BASE_API_URL || 'https://ters.gallery',
            },
        },
    },

    modules: ['nuxt-swiper', '@nuxt/image'],
});
