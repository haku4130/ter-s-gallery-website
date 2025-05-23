export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    nitro: {
        routeRules: {
            '/api/**': {
                proxy: process.env.NUXT_PUBLIC_API_BASE
                    ? `${process.env.NUXT_PUBLIC_API_BASE}/api/**`
                    : 'http://backend:8000/api/**',
            },
        },
    },

    image: {
        provider: 'none',
    },

    modules: ['nuxt-swiper', '@nuxt/image'],
});
