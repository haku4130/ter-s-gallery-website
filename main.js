let isSideMenuOpen = false;

function openNav() {
    document.getElementById('mySidenav').style.width = '30%';
    document.querySelector('.sidenav').classList.remove('sidenav-opacity');
    isSideMenuOpen = true;
    document.querySelector('.header-inside').classList.add('sideMenuOpen');
}

function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.querySelector('.sidenav').classList.add('sidenav-opacity');
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

    document.addEventListener('pointermove', (e) => {
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

    // projects
    let dropbtns = document.querySelectorAll('.dropbtn');

    // dropbtns.forEach(function (btn) {
    //     btn.addEventListener('click', function () {
    //         let dropdownContent = btn.nextElementSibling;

    //         dropdownContent.classList.toggle('visible');
    //         document
    //             .querySelectorAll('.dropdown-content.visible')
    //             .forEach(function (content) {
    //                 if (content !== dropdownContent)
    //                     content.classList.remove('visible');
    //             });
    //     });
    // });
});
