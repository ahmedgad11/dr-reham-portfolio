document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');
    const heroText = document.querySelector('.hero-text');
    const mainContent = document.querySelector('.main-content');

    if (profileImg) profileImg.classList.add('animate-from-right');
    if (heroText) heroText.classList.add('animate-from-left');
    if (mainContent) mainContent.classList.add('animate-from-bottom');
});

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll('.animate-from-bottom, .content-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // يتفعل الأنيميشن بمجرد ظهور 10% من الكارت
    });

    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// Modal Preview for Certificates
document.addEventListener("DOMContentLoaded", function () {
    // إنشاء عنصر الـ Modal في الصفحة
    const modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
        <span class="img-modal-close">&times;</span>
        <img class="img-modal-content" src="" alt="معاينة المكبرة">
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.img-modal-content');
    const closeBtn = modal.querySelector('.img-modal-close');

    // تفعيل التكبير عند الضغط على أي صورة شهادة
    document.querySelectorAll('.cert-img-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function () {
            const img = this.querySelector('.cert-img');
            if (img) {
                modalImg.src = img.src;
                modal.classList.add('active');
            }
        });
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق أو الخروج
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}