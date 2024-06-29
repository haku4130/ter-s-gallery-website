let isSideMenuOpen = false;

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

document.querySelector('.hamburger').addEventListener('click', toggleNav);

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.remove('hidden');
    let timer;

    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    function updateCursorPosition(e) {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    document.addEventListener('pointermove', (e) => {
        updateCursorPosition(e);
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

    let dropbtns = document.querySelectorAll('.dropbtn');

    dropbtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.stopPropagation();

            let dropdownContent = btn.nextElementSibling;

            dropdownContent.classList.toggle('visible');
            document
                .querySelectorAll('.dropdown-content.visible')
                .forEach(function (content) {
                    if (content !== dropdownContent)
                        content.classList.remove('visible');
                });
        });
    });

    document.addEventListener('click', function (event) {
        document
            .querySelectorAll('.dropdown-content.visible')
            .forEach(function (content) {
                if (
                    !content.contains(event.target) &&
                    !content.previousElementSibling.contains(event.target)
                ) {
                    content.classList.remove('visible');
                }
            });
    });
});
