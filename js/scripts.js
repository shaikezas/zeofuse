/* === SPINNER === */
var spinnerWrapperEl = document.querySelector('.spinner-wrapper');
if (spinnerWrapperEl) {
    window.addEventListener('load', function () {
        spinnerWrapperEl.style.opacity = '0';
        setTimeout(function () { spinnerWrapperEl.style.display = 'none'; }, 300);
    });
}

/* === NAVBAR SCROLL (glass effect) === */
function scrollFunction() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (document.documentElement.scrollTop > 30) {
        navbar.classList.add('top-nav-collapse');
    } else {
        navbar.classList.remove('top-nav-collapse');
    }
}

window.onscroll = function () {
    scrollFunction();
    scrollFunctionBTT();
};
window.onload = function () {
    scrollFunction();
};

/* === MOBILE NAV === */
var navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        var offcanvas = document.querySelector('.offcanvas-collapse');
        if (offcanvas) offcanvas.classList.toggle('open');
    });
});
var navToggler = document.querySelector('.navbar-toggler');
if (navToggler) {
    navToggler.addEventListener('click', function () {
        var offcanvas = document.querySelector('.offcanvas-collapse');
        if (offcanvas) offcanvas.classList.toggle('open');
    });
}

/* === REVEAL ANIMATIONS === */
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function (el) {
        var windowHeight = window.innerHeight;
        var elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

/* === BACK TO TOP === */
var myButton = document.getElementById('myBtn');

function scrollFunctionBTT() {
    if (!myButton) return;
    myButton.style.display = (document.documentElement.scrollTop > 400) ? 'block' : 'none';
}

function topFunction() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

/* === PARTICLE CANVAS === */
(function () {
    var canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H;

    function resize() {
        var hero = canvas.parentElement;
        W = canvas.width = hero ? hero.offsetWidth : window.innerWidth;
        H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }

    function Particle() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.45 + 0.1;
    }

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
    };

    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 65; i++) {
        particles.push(new Particle());
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(244,121,32,' + particles[i].alpha + ')';
            ctx.fill();
        }

        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(255,255,255,' + (0.07 * (1 - dist / 110)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        requestAnimationFrame(drawParticles);
    }

    drawParticles();
})();

/* === WORD CYCLING === */
(function () {
    var el = document.getElementById('wordCycle');
    if (!el) return;
    var words = ['Amazon', 'Noon', 'Namshi', 'Shopify', 'eBay', 'Zalando', 'Flipkart', 'Lazada', '700+ More'];
    var idx = 0;

    setInterval(function () {
        el.classList.add('fade-out');
        setTimeout(function () {
            idx = (idx + 1) % words.length;
            el.textContent = words[idx];
            el.classList.remove('fade-out');
        }, 260);
    }, 2200);
})();

/* === STATS COUNTER (IntersectionObserver) === */
(function () {
    var statNums = document.querySelectorAll('.fz-stat-num');
    if (!statNums.length || !window.IntersectionObserver) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = '1';
                var target = parseInt(entry.target.dataset.target, 10);
                var duration = 1600;
                var steps = Math.ceil(duration / 40);
                var step = Math.ceil(target / steps);
                var current = 0;
                var timer = setInterval(function () {
                    current = Math.min(current + step, target);
                    entry.target.textContent = current;
                    if (current >= target) clearInterval(timer);
                }, 40);
            }
        });
    }, { threshold: 0.3 });

    statNums.forEach(function (el) { observer.observe(el); });
})();

/* === DROPDOWN HOVER (desktop nav) === */
var dropdownCheck = document.querySelector('.dropdown');
if (dropdownCheck) {
    function toggleDropdown(e) {
        var _d = e.target.closest('.dropdown');
        if (!_d) return;
        var _m = _d.querySelector('.dropdown-menu');
        if (!_m) return;
        setTimeout(function () {
            var shouldOpen = _d.matches(':hover');
            _m.classList.toggle('show', shouldOpen);
            _d.classList.toggle('show', shouldOpen);
            _d.setAttribute('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    dropdownCheck.addEventListener('mouseleave', toggleDropdown);
    dropdownCheck.addEventListener('mouseover', toggleDropdown);
}
