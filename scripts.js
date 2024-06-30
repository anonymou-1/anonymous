document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const adminSection = document.getElementById('admin-section');
    const loginSection = document.getElementById('login-section');

    // تغيير القيمة الافتراضية لكلمة المرور إلى "A7med01"
    const storedPassword = localStorage.getItem('adminPassword') || 'A7med01';

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (passwordInput.value === storedPassword) {
            loginSection.style.display = 'none';
            adminSection.style.display = 'block';
        } else {
            alert('كلمة المرور غير صحيحة');
        }
    });

    document.getElementById('add-article-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('article-title').value;
        const content = document.getElementById('article-content').value;
        const imageInput = document.getElementById('article-image');
        const articlesList = document.getElementById('articles-list');

        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const article = document.createElement('div');
                article.innerHTML = `<h3>${title}</h3><img src="${e.target.result}" alt="Article Image"><p>${content}</p>`;
                articlesList.appendChild(article);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const article = document.createElement('div');
            article.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
            articlesList.appendChild(article);
        }

        document.getElementById('article-title').value = '';
        document.getElementById('article-content').value = '';
        document.getElementById('article-image').value = '';
    });

    document.getElementById('add-tip-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('tip-content').value;
        const tipsList = document.getElementById('tips-list');
        const tip = document.createElement('div');
        tip.innerHTML = `<p>${content}</p>`;
        tipsList.appendChild(tip);
        document.getElementById('tip-content').value = '';
    });

    document.getElementById('change-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        localStorage.setItem('adminPassword', newPassword);
        alert('تم تغيير كلمة المرور بنجاح');
        document.getElementById('new-password').value = '';
    });
});
