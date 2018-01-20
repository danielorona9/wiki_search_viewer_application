document.addEventListener('DOMContentLoaded', function() {

  let wikiSearchBtn = document.getElementById('btn-wiki-search');
  let wikiSearchInput = document.getElementById('txt-search');

  wikiSearchInput.addEventListener('keypress', function(e) {
    let searchInput = document.getElementById('txt-search').value;
    console.log(searchInput);
    console.log(e.which);
    let inputKey = e.which;
    if (inputKey === 13) {
      if (searchInput === '' || searchInput === undefined || searchInput === 'Search Wiki') {
        alert('please enter a search.');
      }else {
        fetchQuery(searchInput);
      }

    }// end of if

  });// end of wikiSearchInput enter event handler

  wikiSearchBtn.addEventListener('click', function() {
    let searchInput = document.getElementById('txt-search').value;
    if (searchInput === '' || searchInput === undefined || searchInput === 'Search Wiki') {
      alert('please enter a search');
    } else if (searchInput != '' || searchInput != undefined) {
      console.log(searchInput);
      fetchQuery(searchInput);
    }

  }); //end of wiki searchBtn
}); //end of document.ready function

function fetchQuery(searchValue) {
  let script = document.createElement('script');
  script.src = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&continue=-%7C%7C&srsearch=' + searchValue + '&srnamespace=0&srlimit=10&sroffset=20&srinfo=&srprop=snippet&callback=jsonpCallback';
  document.body.appendChild(script);
}

function jsonpCallback(data) {

  let articleContainer = document.getElementById('article-list-container');
  let html = '';
  html += '<ul id="article-list">';
  for (let i = 0; i < data.query.search.length; i++) {
    html += '<li class="article-list-item">';
    html += '<h2 class="title">' + data.query.search[i].title + '</h2>';
    html += '<p class="article-info">' + data.query.search[i].snippet + '</p>';
    html += '<input type="hidden" id="pgID" name="pgID" value="' + data.query.search[i].pageid + '"/>';
    html += '</li>';
  } //end of html for loop
  html += '</ul>';

  articleContainer.innerHTML = html;

  let articleList = document.getElementById('article-list');
  let articleListItems = document.getElementsByClassName('article-list-item');

  for (let article of articleListItems) {
    article.addEventListener('click', function(e) {

      let pgID = e.target.lastChild.value;

      if (e.target.classList.contains('article-list-item')) {
        requestArticleById(pgID);
      }
    });
  } //end of article loop
} //end of jsonp callback

function requestArticleById(pgIdNumber) {
  window.open('https://en.wikipedia.org/?curid=' + pgIdNumber, '_blank');
} //end of request article
