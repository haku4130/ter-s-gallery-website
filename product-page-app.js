import {
    createApp,
    ref,
    computed,
} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js';

createApp({
    setup() {
        const products = ref([
            {
                name: 'Monica',
                title: 'Комод',
                price: '$1,500',
                image: '/static/public/11.jpg',
                material: 'Дерево',
                color: 'Коричневый',
            },
            {
                name: 'Sofia',
                title: 'Шкаф',
                price: '$2,000',
                image: '/static/public/12.jpg',
                material: 'Металл',
                color: 'Серый',
            },
            {
                name: 'Luna',
                title: 'Стол',
                price: '$750',
                image: '/static/public/13.jpg',
                material: 'Стекло',
                color: 'Прозрачный',
            },
            {
                name: 'Aurora',
                title: 'Кресло',
                price: '$1,200',
                image: '/static/public/33.jpg',
                material: 'Кожа',
                color: 'Черный',
            },
            {
                name: 'Isabella',
                title: 'Диван',
                price: '$3,000',
                image: '/static/public/9.jpg',
                material: 'Ткань',
                color: 'Синий',
            },
            {
                name: 'Mia',
                title: 'Кровать',
                price: '$2,500',
                image: '/static/public/7 (2).jpg',
                material: 'Металл',
                color: 'Белый',
            },
            {
                name: 'Olivia',
                title: 'Тумба',
                price: '$900',
                image: '/static/public/main.jpg',
                material: 'Дерево',
                color: 'Бежевый',
            },
        ]);
        const selectedCategories = ref([]);
        const selectedMaterials = ref([]);
        const selectedColors = ref([]);
        const selectedPrices = ref([]);

        const combinedSelections = computed(() => {
            return [
                ...selectedCategories.value,
                ...selectedMaterials.value,
                ...selectedColors.value,
                ...selectedPrices.value,
            ];
        });

        const categories = computed(() => {
            const uniqueCategories = [
                ...new Set(products.value.map((product) => product.title)),
            ];
            return uniqueCategories.map((name, index) => ({
                id: index + 1,
                name,
            }));
        });
        const materials = computed(() => {
            const uniqueMaterials = [
                ...new Set(products.value.map((product) => product.material)),
            ];
            return uniqueMaterials.map((name, index) => ({
                id: index + 1,
                name,
            }));
        });
        const colors = computed(() => {
            const uniqueColors = [
                ...new Set(products.value.map((product) => product.color)),
            ];
            return uniqueColors.map((name, index) => ({ id: index + 1, name }));
        });
        const priceRanges = ref([
            { id: 1, range: 'до $1000' },
            { id: 2, range: '$1000 - $2000' },
            { id: 3, range: 'свыше $2000' },
        ]);

        const filteredProducts = computed(() => {
            return products.value.filter((product) => {
                return (
                    (selectedCategories.value.length === 0 ||
                        selectedCategories.value.includes(product.title)) &&
                    (selectedMaterials.value.length === 0 ||
                        selectedMaterials.value.includes(product.material)) &&
                    (selectedColors.value.length === 0 ||
                        selectedColors.value.includes(product.color)) &&
                    (selectedPrices.value.length === 0 ||
                        selectedPrices.value.some((price) =>
                            priceMatch(product.price, price)
                        ))
                );
            });
        });

        const priceMatch = (productPrice, selectedPriceRange) => {
            const price = parseInt(productPrice.replace(/[$,]/g, ''));
            if (selectedPriceRange === 'до $1000') {
                return price < 1000;
            } else if (selectedPriceRange === '$1000 - $2000') {
                return price >= 1000 && price <= 2000;
            } else if (selectedPriceRange === 'свыше $2000') {
                return price > 2000;
            }
            return false;
        };

        function clearFilters() {
            selectedCategories.value = [];
            selectedMaterials.value = [];
            selectedColors.value = [];
            selectedPrices.value = [];
        }

        return {
            products,
            selectedCategories,
            selectedMaterials,
            selectedColors,
            selectedPrices,
            combinedSelections,
            categories,
            materials,
            colors,
            priceRanges,
            filteredProducts,
            clearFilters,
        };
    },
}).mount('#app');
