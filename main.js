let isSideMenuOpen = false;

function openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    isSideMenuOpen = true;
    document.querySelector('.header-inside').classList.add('sideMenuOpen');
}

function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
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

document.querySelector('.hamburger').addEventListener('click', toggleNav);

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    let timer;

    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    function updateCursorPosition(e) {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    document.addEventListener('mousemove', (e) => {
        updateCursorPosition(e);
        cursor.classList.remove('hidden');
        clearTimeout(timer);
        timer = setTimeout(() => {
            cursor.classList.add('hidden');
        }, 1000);
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

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });
    });
});
