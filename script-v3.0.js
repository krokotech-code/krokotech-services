document.addEventListener("DOMContentLoaded", () => {

    // 1. SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                });
            }
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
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
            header.style.backgroundColor = "rgba(3, 5, 8, 0.97)";
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.6)";
        } else {
            header.style.backgroundColor = "rgba(5, 7, 10, 0.85)";
            header.style.boxShadow = "none";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // 3. MENÚ HAMBURGUESA
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
    }

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // 4. CONTADOR ANIMADO
    function animateCounter(el, target, duration = 1800) {
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = start;
            }
        }, 16);
    }

    const statsSection = document.getElementById('stats');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                document.querySelectorAll('.stat-number').forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCounter(el, target);
                });
            }
        });
    }, { threshold: 0.4 });

    if (statsSection) statsObserver.observe(statsSection);

    // 5. FADE-IN DE CARDS AL HACER SCROLL
    const fadeCards = document.querySelectorAll('.fade-in-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { // Removimos la "i" que no se usa
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeCards.forEach((card) => { // Quitamos el index de aquí
        cardObserver.observe(card);
    });

    // 6. FAQ ACORDEÓN
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');

            // Cerrar todos
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // Abrir el clickeado si estaba cerrado
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

});
