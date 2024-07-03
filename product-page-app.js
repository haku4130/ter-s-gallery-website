import {
    createApp,
    ref,
    computed,
    onMounted,
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
                ...selectedCategories.value.map((item) => ({
                    type: 'category',
                    value: item,
                })),
                ...selectedMaterials.value.map((item) => ({
                    type: 'material',
                    value: item,
                })),
                ...selectedColors.value.map((item) => ({
                    type: 'color',
                    value: item,
                })),
                ...selectedPrices.value.map((item) => ({
                    type: 'price',
                    value: item,
                })),
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

        function removeFilter(id) {
            const selection = combinedSelections.value[id];
            if (selection.type === 'category') {
                selectedCategories.value = selectedCategories.value.filter(
                    (item) => item !== selection.value
                );
            } else if (selection.type === 'material') {
                selectedMaterials.value = selectedMaterials.value.filter(
                    (item) => item !== selection.value
                );
            } else if (selection.type === 'color') {
                selectedColors.value = selectedColors.value.filter(
                    (item) => item !== selection.value
                );
            } else if (selection.type === 'price') {
                selectedPrices.value = selectedPrices.value.filter(
                    (item) => item !== selection.value
                );
            }
        }

        // price slider

        const min = ref(20);
        const max = ref(200);
        const minValue = ref(20);
        const maxValue = ref(200);
        const step = ref(1);

        const totalSteps = computed(() => (max.value - min.value) / step.value);
        const percentPerStep = computed(() => 100 / totalSteps.value);
        const percentInPx = computed(() => {
            const trackWidth = _vpcTrack.value.offsetWidth;
            const oneStepInPx = trackWidth / totalSteps.value;
            return oneStepInPx / percentPerStep.value;
        });

        const isDragging = ref(false);
        const curTrack = ref(null);

        const _vpcTrack = ref(null);
        const trackHighlight = ref(null);
        const track1 = ref(null);
        const track2 = ref(null);

        const valueToPercent = (value) => {
            return ((value - min.value) / step.value) * percentPerStep.value;
        };

        const setTrackHightlight = () => {
            trackHighlight.value.style.left =
                valueToPercent(minValue.value) + '%';
            trackHighlight.value.style.width =
                valueToPercent(maxValue.value) -
                valueToPercent(minValue.value) +
                '%';
        };

        const moveTrack = (track, ev) => {
            const trackX = Math.round(
                _vpcTrack.value.getBoundingClientRect().left
            );
            const clientX = ev.clientX;
            const moveDiff = clientX - trackX;

            const moveInPct = moveDiff / percentInPx.value;

            if (moveInPct < 0) moveInPct = 0; // Ограничиваем движение влево
            if (moveInPct > 100) moveInPct = 100; // Ограничиваем движение вправо
            const value =
                Math.round(moveInPct / percentPerStep.value) * step.value +
                min.value;

            if (track === 'track1') {
                if (value >= maxValue.value - step.value) return;
                minValue.value = value;
            }

            if (track === 'track2') {
                if (value <= minValue.value + step.value) return;
                maxValue.value = value;
            }

            track1.value.style.left = valueToPercent(minValue.value) + '%';
            track2.value.style.left = valueToPercent(maxValue.value) + '%';
            setTrackHightlight();
        };

        const mousedown = (ev, track) => {
            if (isDragging.value) return;
            isDragging.value = true;
            curTrack.value = track;
            ev.preventDefault();
        };

        const mouseup = () => {
            if (!isDragging.value) return;
            isDragging.value = false;
        };

        const mousemove = (ev) => {
            if (!isDragging.value) return;
            moveTrack(curTrack.value, ev);
        };

        const setClickMove = (ev) => {
            const track1Left = track1.value.getBoundingClientRect().left;
            const track2Left = track2.value.getBoundingClientRect().left;

            if (ev.clientX < track1Left) {
                moveTrack('track1', ev);
            } else if (ev.clientX - track1Left < track2Left - ev.clientX) {
                moveTrack('track1', ev);
            } else {
                moveTrack('track2', ev);
            }
        };

        onMounted(() => {
            track1.value.style.left = valueToPercent(minValue.value) + '%';
            track2.value.style.left = valueToPercent(maxValue.value) + '%';
            setTrackHightlight();

            document.body.addEventListener('mouseup', mouseup);
            document.body.addEventListener('mousemove', mousemove);

            [
                'mousedown',
                'mouseup',
                'mousemove',
                'touchstart',
                'touchmove',
                'touchend',
            ].forEach((type) => {
                track1.value.addEventListener(type, (ev) => {
                    ev.stopPropagation();
                    if (type === 'mousedown' || type === 'touchstart')
                        mousedown(ev, 'track1');
                    if (type === 'mouseup' || type === 'touchend') mouseup(ev);
                    if (type === 'mousemove' || type === 'touchmove')
                        mousemove(
                            ev.changedTouches ? ev.changedTouches[0] : ev
                        );
                });

                track2.value.addEventListener(type, (ev) => {
                    ev.stopPropagation();
                    if (type === 'mousedown' || type === 'touchstart')
                        mousedown(ev, 'track2');
                    if (type === 'mouseup' || type === 'touchend') mouseup(ev);
                    if (type === 'mousemove' || type === 'touchmove')
                        mousemove(
                            ev.changedTouches ? ev.changedTouches[0] : ev
                        );
                });
            });

            _vpcTrack.value.addEventListener('click', (ev) => {
                ev.stopPropagation();
                setClickMove(ev);
            });

            trackHighlight.value.addEventListener('click', (ev) => {
                ev.stopPropagation();
                setClickMove(ev);
            });
        });

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
            removeFilter,
            minValue,
            maxValue,
            _vpcTrack,
            trackHighlight,
            track1,
            track2,
        };
    },
}).mount('#app');
