/**
 * Awaylon 埃维隆 - 网站交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initProductFilter();
    initContactForm();
    initAdvantagesTabs();
});

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const isHomePage = document.querySelector('.hero') !== null;

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (isHomePage) {
            navbar.classList.remove('scrolled');
        }
    }

    // 初始检查
    handleScroll();

    // 滚动监听
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 点击菜单项关闭
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

/**
 * 产品筛选功能
 */
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length === 0 || productCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // 筛选产品
            productCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * 联系表单处理
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取表单数据
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            product: formData.get('product'),
            size: formData.get('size'),
            color: formData.get('color'),
            message: formData.get('message')
        };

        // 验证
        if (!data.name || !data.phone) {
            alert('请填写姓名和联系电话');
            return;
        }

        // 模拟提交
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        // 模拟网络请求
        setTimeout(() => {
            // 显示成功消息
            alert('感谢您的询价！我们将尽快与您联系。');

            // 重置表单
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

/**
 * 核心优势标签页切换
 */
function initAdvantagesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0 || tabContents.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/**
 * 平滑滚动到锚点
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * 证书灯箱效果
 */
function openLightbox(element) {
    const lightbox = document.getElementById('certificateLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const img = element.querySelector('img');
    
    if (lightbox && lightboxImage && img) {
        lightboxImage.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('certificateLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ESC键关闭灯箱
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
