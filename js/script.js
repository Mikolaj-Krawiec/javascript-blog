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

  const  generateTitleLinks = (customSelector = '') => {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

  const optArticleTagsSelector = '.post-tags .list';

  const generateTags = () => {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
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
  };

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = this.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activelinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (const activelink of activelinks) {
      /* remove class active */
      activelink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */
    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll('a[href="'+ href +'"]');
    /* START LOOP: for each found tag link */
    for (const link of links) {
    /* add class active */
      link.classList.add('active');
    }
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  const addClickListenersToTags = () => {
    /* find all links to tags */
    const list = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (const tag of list) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  };

  addClickListenersToTags();

}
