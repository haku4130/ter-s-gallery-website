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

        const combinedSelections = computed(() => {
            const selections = [
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
            ];

            if (minValue.value !== min.value) {
                selections.push({
                    type: 'min-price',
                    value: minValue.value,
                    str: 'Цена от: $',
                });
            }

            if (maxValue.value !== max.value) {
                selections.push({
                    type: 'max-price',
                    value: maxValue.value,
                    str: 'Цена до: $',
                });
            }

            return selections;
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
            } else if (selection.type === 'min-price') {
                minValue.value = min.value;
            } else if (selection.type === 'max-price') {
                maxValue.value = max.value;
            }
            updateSlider();
        }

        function updateSlider() {
            track1.value.style.left = valueToPercent(minValue.value) + '%';
            track2.value.style.left = valueToPercent(maxValue.value) + '%';
            setTrackHightlight();
        }

        // price slider

        const minPrice = computed(() =>
            Math.min(
                ...products.value.map((p) =>
                    parseInt(p.price.replace(/[$,]/g, ''))
                )
            )
        );
        const maxPrice = computed(() =>
            Math.max(
                ...products.value.map((p) =>
                    parseInt(p.price.replace(/[$,]/g, ''))
                )
            )
        );

        const min = ref(minPrice.value);
        const max = ref(maxPrice.value);
        const minValue = ref(minPrice.value);
        const maxValue = ref(maxPrice.value);
        const step = ref(50);

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

            let moveInPct = moveDiff / percentInPx.value;

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

        const filteredProducts = computed(() => {
            return products.value.filter((product) => {
                const productPrice = parseInt(
                    product.price.replace(/[$,]/g, '')
                );

                return (
                    (selectedCategories.value.length === 0 ||
                        selectedCategories.value.includes(product.title)) &&
                    (selectedMaterials.value.length === 0 ||
                        selectedMaterials.value.includes(product.material)) &&
                    (selectedColors.value.length === 0 ||
                        selectedColors.value.includes(product.color)) &&
                    productPrice >= minValue.value &&
                    productPrice <= maxValue.value
                );
            });
        });

        function clearFilters() {
            selectedCategories.value = [];
            selectedMaterials.value = [];
            selectedColors.value = [];
            minValue.value = min.value;
            maxValue.value = max.value;
            updateSlider();
        }

        const toggleDropdown = (event) => {
            const dropdownContent = event.target.nextElementSibling;
            if (dropdownContent.classList.contains('visible')) {
                if (dropdownContent.classList.contains('price-filter')) {
                    dropdownContent.style.height = '80px';
                } else {
                    dropdownContent.style.height =
                        dropdownContent.scrollHeight + 'px';
                }
                requestAnimationFrame(() => {
                    dropdownContent.style.height = '0';
                });
                setTimeout(
                    () => dropdownContent.classList.toggle('visible'),
                    250
                );
            } else {
                if (dropdownContent.classList.contains('price-filter')) {
                    dropdownContent.style.height = '80px';
                } else {
                    dropdownContent.style.height =
                        dropdownContent.scrollHeight + 'px';
                }
                dropdownContent.classList.toggle('visible');
            }
        };

        onMounted(() => {
            const dropbtns = document.querySelectorAll('.dropbtn');
            dropbtns.forEach((btn) =>
                btn.addEventListener('click', toggleDropdown)
            );
            document.addEventListener('click', (event) => {
                document
                    .querySelectorAll('.dropdown-content.visible')
                    .forEach((content) => {
                        if (
                            !content.contains(event.target) &&
                            !content.previousElementSibling.contains(
                                event.target
                            )
                        ) {
                            if (content.classList.contains('price-filter')) {
                                content.style.height = '80px';
                            } else {
                                content.style.height =
                                    content.scrollHeight + 'px';
                            }
                            requestAnimationFrame(() => {
                                content.style.height = '0';
                            });
                            setTimeout(
                                () => content.classList.toggle('visible'),
                                250
                            );
                        }
                    });
            });

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
            combinedSelections,
            categories,
            materials,
            colors,
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
