let isSideMenuOpen = false;
let isTouchDevice = true;

function openNav() {
    let sidenav = document.getElementById('mySidenav');
    sidenav.classList.add('sidenav-shown-styles');

    isSideMenuOpen = true;
    document.querySelector('.header-inside').classList.add('sideMenuOpen');
}

function closeNav() {
    let sidenav = document.getElementById('mySidenav');
    sidenav.classList.remove('sidenav-shown-styles');

    isSideMenuOpen = false;
    document.querySelector('.header-inside').classList.remove('sideMenuOpen');
}

function toggleNav() {
    if (isSideMenuOpen) {
        closeNav();
    } else {
        openNav();
    }
}

function scrollWithOffset(id) {
    const element = document.getElementById(id);

    let yOffset = -131;
    if (window.innerWidth < 1000) {
        yOffset = -121;
    }

    const yPosition =
        element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: yPosition, behavior: 'smooth' });
}

document.querySelector('.hamburger').addEventListener('click', toggleNav);

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.remove('hidden');

    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    function updateCursorPosition(e) {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    function detectTouchDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }

    isTouchDevice = detectTouchDevice();

    document.addEventListener('pointermove', (e) => {
        if (!isTouchDevice) {
            updateCursorPosition(e);
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.remove('hidden');
    });

    const elements = document.querySelectorAll('a, .cursor-link');
    elements.forEach((el) => {
        el.addEventListener('mouseenter', function () {
            cursor.classList.add('pointer');
        });

        el.addEventListener('mouseleave', function () {
            cursor.classList.remove('pointer');
        });
    });

    document.querySelector('.filter-icon')?.addEventListener('click', () => {
        document.querySelectorAll('.dropbtn').forEach((content) => {
            content.classList.toggle('hidden');
        });
    });
});
