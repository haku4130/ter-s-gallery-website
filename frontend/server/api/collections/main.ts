export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const targetURL = `${config.public.apiBase}/api/collections/main/`;

    const response = await $fetch(targetURL);

    return response;
});
