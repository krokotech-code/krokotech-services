document.addEventListener("DOMContentLoaded", () => {

    // 1. SCROLL SUAVE (Smooth Scroll)
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. OCULTAR HEADER CON TOLERANCIA
    let lastScrollTop = 0;
    const tolerance = 10;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScrollTop - currentScroll) <= tolerance) return;

        if (currentScroll > lastScrollTop && currentScroll > 120) {
            header.classList.add('hide');
        } else if (currentScroll < lastScrollTop) {
            header.classList.remove('hide');
        }

        if (currentScroll > 50) {
            header.style.backgroundColor = "rgba(3, 5, 8, 0.95)";
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.6)";
        } else {
            header.style.backgroundColor = "rgba(5, 7, 10, 0.85)";
            header.style.boxShadow = "none";
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});
