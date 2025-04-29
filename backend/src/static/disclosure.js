const toggleDropdown = (event) => {
    const dropdownContent = event.target.nextElementSibling;
    if (dropdownContent.classList.contains('visible')) {
        if (dropdownContent.classList.contains('price-filter')) {
            dropdownContent.style.height = '80px';
        } else {
            dropdownContent.style.height = dropdownContent.scrollHeight + 'px';
        }
        requestAnimationFrame(() => {
            dropdownContent.style.height = '0';
        });
        setTimeout(() => dropdownContent.classList.toggle('visible'), 250);
    } else {
        if (dropdownContent.classList.contains('price-filter')) {
            dropdownContent.style.height = '80px';
        } else {
            dropdownContent.style.height = dropdownContent.scrollHeight + 'px';
        }
        dropdownContent.classList.toggle('visible');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const dropbtns = document.querySelectorAll('.dropbtn');
    dropbtns.forEach((btn) => btn.addEventListener('click', toggleDropdown));
    document.addEventListener('click', (event) => {
        document
            .querySelectorAll('.dropdown-content.visible')
            .forEach((content) => {
                if (
                    !content.contains(event.target) &&
                    !content.previousElementSibling.contains(event.target)
                ) {
                    if (content.classList.contains('price-filter')) {
                        content.style.height = '80px';
                    } else {
                        content.style.height = content.scrollHeight + 'px';
                    }
                    requestAnimationFrame(() => {
                        content.style.height = '0';
                    });
                    setTimeout(() => content.classList.toggle('visible'), 250);
                }
            });
    });
});
