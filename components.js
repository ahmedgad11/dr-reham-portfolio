// 1. الناف بار العلوي (Navbar)
const navbarHTML = `
    <div class="nav-container">
        
      
    </div>
`;

// 2. الهيدر والبايو وصورة البروفايل (Hero Section)
const heroHTML = `
    <div class="hero-container">
        <img src="./pics/profile.jpeg" alt="الصورة الشخصية" class="profile-img">
        <div class="hero-text">
            <h1>دكتور / ريهام عبدالفتاح عيد عمارة</h1>
            <div class="hero-subtitle">موجه لغة انجليزية</div>
            <p>نبذة عني : 
                <br>
            قيادية تربوية وموجهة لغة إنجليزية تمتلك مسيرة حافلة تمتد لأكثر من 6 سنوات في الإدارة المدرسية لمدارس اللغات، بجانب خبرة أكاديمية وميدانية واسعة في تطوير المناهج والإشراف التربوي. تجمع رؤيتي بين القيادة الاستراتيجية للفرق، التخطيط الإداري، والتوجيه التربوي الفعال لرفع كفاءة المؤسسات التعليمية. حاصلة على تكريم رسمي كمعلمة متميزة على مستوى المحافظة لعام 2011، ومزودة بحصيلة واسعة من الدورات المتقدمة في الجودة الشاملة، القيادة الإدارية، وإعداد القادة؛ مما يمنحني قدرة عالية على اتخاذ القرارات، حل المشكلات، وبناء بيئات تعلم تفاعلية تضمن تحقيق أعلى معايير الجودة والأداء الأكاديمي.</p>
        </div>
    </div>
`;

// (Page Navigation) أزرار التنقل بين الصفحات
function getPageNavHTML(activePage) {
    return `
    <div class="page-nav">
        <a href="index.html" class="page-btn ${activePage === 'index' || activePage === 'experience' ? 'active' : ''}"><i class="fa-solid fa-briefcase"></i>الخبرات و المؤهلات </a>
        <a href="experience.html" class="page-btn ${activePage === 'education' ? 'active' : ''}"><i class="fa-solid fa-compass"></i> الدورات والمهارات</a>
        <a href="honors.html" class="page-btn ${activePage === 'honors' ? 'active' : ''}"><i class="fa-solid fa-award"></i> التكريمات</a>
        <a href="contact.html" class="page-btn ${activePage === 'contact' ? 'active' : ''}"><i class="fa-solid fa-envelope"></i> التواصل</a>
    </div>
    `;
}

// 4. الفوتر الثابت (Footer)
const footerHTML = `
    <p>جميع الحقوق محفوظة &copy; 2026 | Dr. Reham Emara</p>
    <p style="font-size: 0.85rem; margin-top: 0.4rem;">Designed & Developed with ❤️ by <strong> 𝔾𝕒𝕕 𓂀</strong></p>
`;

// دالة العرض التلقائي لكل الأجزاء الثابتة
document.addEventListener("DOMContentLoaded", function () {
    const navEl = document.getElementById('navbar-component');
    if (navEl) navEl.innerHTML = navbarHTML;

    const heroEl = document.getElementById('hero-component');
    if (heroEl) heroEl.innerHTML = heroHTML;

    const pageNavEl = document.getElementById('page-nav-component');
    if (pageNavEl) {
        const activePage = pageNavEl.getAttribute('data-active');
        pageNavEl.innerHTML = getPageNavHTML(activePage);
    }

    const footerEl = document.getElementById('footer-component');
    if (footerEl) footerEl.innerHTML = footerHTML;
});