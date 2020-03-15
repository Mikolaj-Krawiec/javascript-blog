{
    var titleClickHandler_1 = function (event) {
        event.preventDefault();
        var clickedElement = this;
        /* remove class 'active' from all article links  */
        var activeLinks = document.querySelectorAll('.titles a.active');
        for (var _i = 0, activeLinks_1 = activeLinks; _i < activeLinks_1.length; _i++) {
            var activeLink = activeLinks_1[_i];
            activeLink.classList.remove('active');
        }
        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        /* remove class 'active' from all articles */
        var activeArticles = document.querySelectorAll('.posts article.active');
        for (var _a = 0, activeArticles_1 = activeArticles; _a < activeArticles_1.length; _a++) {
            var activeArticle = activeArticles_1[_a];
            activeArticle.classList.remove('active');
        }
        /* get 'href' attribute from the clicked link and
        find the correct article using the selector (value of 'href' attribute) and
        add class 'active' to the correct article */
        var articleId = clickedElement.getAttribute('href').slice(1);
        document.getElementById(articleId).classList.add('active');
    };
    var optArticleSelector_1 = '.post';
    var optTitleSelector_1 = '.post-title';
    var optTitleListSelector_1 = '.titles';
    var generateTitleLinks = function () {
        /* remove contents of titleList */
        var titleList = document.querySelector(optTitleListSelector_1);
        titleList.innerHTML = '';
        /* for each article */
        var articles = document.querySelectorAll(optArticleSelector_1);
        var html = '';
        for (var _i = 0, articles_1 = articles; _i < articles_1.length; _i++) {
            var article = articles_1[_i];
            /* get the article id */
            var articleId = article.getAttribute('id');
            /* get the title from the title element */
            var articleTitle = article.querySelector(optTitleSelector_1).innerHTML;
            /* create HTML of the link */
            var linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            /* insert link into titleList */
            html += linkHTML;
            //titleList.insertAdjacentHTML("beforeend",linkHTML);
        }
        titleList.innerHTML = html;
        var links = document.querySelectorAll('.titles a');
        for (var _a = 0, links_1 = links; _a < links_1.length; _a++) {
            var link = links_1[_a];
            link.addEventListener('click', titleClickHandler_1);
        }
    };
    generateTitleLinks();
}
