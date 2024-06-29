document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    if (window.location.pathname.endsWith('admin.html')) {
        loadAdminArticles();
    }
});

// تحقق من كلمة المرور
function login() {
    const password = document.getElementById('password').value;
    if (password === 'admin123') { // كلمة المرور
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('article-form').style.display = 'block';
        document.getElementById('admin-articles').style.display = 'block';
        loadAdminArticles(); // تحميل المقالات بعد تسجيل الدخول
    } else {
        alert('كلمة المرور غير صحيحة');
    }
}

// إضافة مقال جديد
function addArticle() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const category = document.getElementById('category').value;

    if (title && content) {
        // إنشاء المقال
        const article = { title, content, category };
        
        // جلب المقالات الموجودة من LocalStorage
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        
        // إضافة المقال الجديد
        articles.push(article);
        
        // تخزين المقالات المحدثة في LocalStorage
        localStorage.setItem('articles', JSON.stringify(articles));
        
        // إعادة توجيه إلى صفحة الإدارة لعرض المقالات المحدثة
        loadAdminArticles();
    } else {
        alert('يرجى ملء جميع الحقول');
    }
}

// تحميل المقالات من LocalStorage وعرضها في الصفحة الرئيسية
function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const articlesContainer = document.getElementById('articles');
    
    articlesContainer.innerHTML = '';
    
    articles.forEach(article => {
        const articleElement = document.createElement('article');
        const articleTitle = document.createElement('h2');
        articleTitle.textContent = article.title;
        const articleContent = document.createElement('p');
        articleContent.textContent = article.content;

        articleElement.appendChild(articleTitle);
        articleElement.appendChild(articleContent);

        articlesContainer.appendChild(articleElement);
    });
}

// تحميل المقالات في لوحة الإدارة
function loadAdminArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const adminArticlesContainer = document.getElementById('articles-management');
    
    adminArticlesContainer.innerHTML = '';

    articles.forEach((article, index) => {
        const articleElement = document.createElement('article');
        const articleTitle = document.createElement('h2');
        articleTitle.textContent = article.title;
        const articleContent = document.createElement('p');
        articleContent.textContent = article.content;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.onclick = function() {
            deleteArticle(index);
        };

        articleElement.appendChild(articleTitle);
        articleElement.appendChild(articleContent);
        articleElement.appendChild(deleteButton);

        adminArticlesContainer.appendChild(articleElement);
    });
}

// حذف المقال
function deleteArticle(index) {
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articles));
    loadAdminArticles();
    loadArticles();
}

// تصفية المقالات حسب القسم
function filterArticles() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const articlesContainer = document.getElementById('articles');
    
    articlesContainer.innerHTML = '';
    
    articles.filter(article => selectedCategory === 'all' || article.category === selectedCategory).forEach(article => {
        const articleElement = document.createElement('article');
        const articleTitle = document.createElement('h2');
        articleTitle.textContent = article.title;
        const articleContent = document.createElement('p');
        articleContent.textContent = article.content;

        articleElement.appendChild(articleTitle);
        articleElement.appendChild(articleContent);

        articlesContainer.appendChild(articleElement);
    });
}
