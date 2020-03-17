'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link and
        find the correct article using the selector (value of 'href' attribute) and
        add class 'active' to the correct article */

    const articleId = clickedElement.getAttribute('href').slice(1);
    document.getElementById(articleId).classList.add('active');

  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';

  const  generateTitleLinks = () => {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      html += linkHTML;
      //titleList.insertAdjacentHTML("beforeend",linkHTML);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

}

const optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('article');
  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper, make html variable with empty string, get tags from data-tags attribute, split tags into array */
    let tagHTML = '';
    const tags = article.getAttribute('data-tags').split(' ');

    /* START LOOP: for each tag */
    for (const tag of tags) {
      /* generate HTML of the link, add generated code to html variable */
      tagHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    }
    /* END LOOP: for each tag, insert HTML of all the links into the tags wrapper */
    article.querySelector(optArticleTagsSelector).innerHTML = tagHTML;
  }
  /* END LOOP: for every article: */
}

generateTags();

