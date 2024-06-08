function openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    console.log('open');
}

function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
}

document.getElementById('openNavBtn').addEventListener('click', openNav);
document
    .querySelector('.sidenav .closebtn')
    .addEventListener('click', closeNav);

document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('mySidenav');
    const openNavBtn = document.getElementById('openNavBtn');
    if (!sidebar.contains(event.target) && !openNavBtn.contains(event.target)) {
        closeNav();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    let timer;

    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

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
