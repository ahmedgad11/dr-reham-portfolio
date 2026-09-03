// --- 1. تهيئة الأحداث والأنيميشن بدون تكرار الحركة عند التبديل ---
function initPageEvents() {
    const animatedElements = document.querySelectorAll('.animate-from-bottom, .content-card');

    // إظهار المحتوى المحقون فوراً وبسلاسة لمنع الأنيميشن المزدوج
    animatedElements.forEach(el => {
        el.classList.add('visible');
    });

    // إعادة تفعيل تكبير الصور / الشهادات (Modal) للمحتوى الجديد
    document.querySelectorAll('.cert-img-wrapper').forEach(wrapper => {
        wrapper.removeEventListener('click', handleCertClick);
        wrapper.addEventListener('click', handleCertClick);
    });
}

function handleCertClick() {
    const modal = document.querySelector('.img-modal');
    const modalImg = modal ? modal.querySelector('.img-modal-content') : null;
    const img = this.querySelector('.cert-img');
    if (modal && modalImg && img) {
        modalImg.src = img.src;
        modal.classList.add('active');
    }
}

// --- 2. إنشاء الـ Modal وتفعيل التحميل الأول ---
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.img-modal')) {
        const modal = document.createElement('div');
        modal.className = 'img-modal';
        modal.innerHTML = `
            <span class="img-modal-close">&times;</span>
            <img class="img-modal-content" src="" alt="معاينة المكبرة">
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.img-modal-close');
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // إضافة كلاسات الأنيميشن الأولى
    const profileImg = document.querySelector('.profile-img');
    const heroText = document.querySelector('.hero-text');
    const mainContent = document.querySelector('.main-content');

    if (profileImg) profileImg.classList.add('animate-from-right');
    if (heroText) heroText.classList.add('animate-from-left');
    if (mainContent) mainContent.classList.add('animate-from-bottom');

    updateActiveButton(window.location.pathname);
    initPageEvents();
});

// --- 3. دالة تحديث لون الزر النشط (Active Class) ---
function updateActiveButton(path) {
    let currentPage = path.split('/').pop() || 'index.html';
    if (currentPage === '') currentPage = 'index.html';

    document.querySelectorAll('.page-btn, .nav-link, nav a').forEach(btn => {
        btn.classList.remove('active');
        const btnHref = btn.getAttribute('href');

        if (btnHref === currentPage || (currentPage === 'index.html' && btnHref === 'index.html')) {
            btn.classList.add('active');
        }
    });
}

// --- 4. التحكم في زر العودة لأعلى الصفحة ---
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

// --- 5. دالة تحميل السير الذاتية ---
function downloadBothCVs() {
    const arabicCvPath = './ريهام عبدالفتاح عيد عمارة cv.pdf';
    const englishCvPath = './Reham Abdel Fattah Emara cv.pdf';

    const linkAr = document.createElement('a');
    linkAr.href = arabicCvPath;
    linkAr.download = 'Dr_Reham_Amara_CV_AR.pdf';
    document.body.appendChild(linkAr);
    linkAr.click();
    document.body.removeChild(linkAr);

    setTimeout(() => {
        const linkEn = document.createElement('a');
        linkEn.href = englishCvPath;
        linkEn.download = 'Dr_Reham_Amara_CV_EN.pdf';
        document.body.appendChild(linkEn);
        linkEn.click();
        document.body.removeChild(linkEn);
    }, 300);
}

// --- 6. معالج التبديل بين الصفحات (SPA Navigation) ---
document.addEventListener('click', async function (e) {
    const link = e.target.closest('.page-btn, .nav-link, nav a');
    if (!link) return;

    const pageUrl = link.getAttribute('href');
    if (!pageUrl || pageUrl.startsWith('#') || pageUrl.startsWith('http')) return;

    e.preventDefault();

    try {
        const response = await fetch(pageUrl);
        if (!response.ok) throw new Error('Network error');

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const newContent = doc.querySelector('#main-content');
        const currentContent = document.querySelector('#main-content');

        if (newContent && currentContent) {
            // تبديل المحتوى والعنوان بدون تغيير موقع السكرول
            currentContent.innerHTML = newContent.innerHTML;
            document.title = doc.title;
            history.pushState(null, '', pageUrl);

            // تحديث اللون
            updateActiveButton(pageUrl);

            // إعادة تشغيل الأحداث للمحتوى الجديد
            initPageEvents();
        } else {
            window.location.href = pageUrl;
        }
    } catch (error) {
        window.location.href = pageUrl;
    }
});

// دعم أزرار الرجوع والتالي في المتصفح
window.addEventListener('popstate', () => {
    updateActiveButton(window.location.pathname);
    location.reload();
});