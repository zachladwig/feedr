/*
  Zach Ladwig
  GA JS-SF-10
*/

const apiKey = '';

let sources = 'abc-news,associated-press,cnn'
let newsApiBaseUrl = `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?apiKey=a3cc5c9a78684254890806d68909de6e&sources=`
let newsApiUrl = newsApiBaseUrl + sources;

// first lets see a little bit of data from newsAPI

function getNews(url) {
  return $.get(url, function(data) {
      console.log('data requested');
      console.log(url);
    })
    .then(function(data) {
      return showNews(data);
    })
    .then(function (data) {
      $('#main').removeClass('hidden');
      $('#popUp').addClass('hidden');

      $('#main a').on('click', function(event) {
        event.preventDefault();
        let i = $(this).parent().parent().data('index');
        $('#popUp').removeClass('loader');
        $('#popUp').removeClass('hidden');
        $('#popUp h1').html(data[i].title);
        $('#popUp p').html(data[i].description);
        $('#popUp a').attr('href',data[i].url)
      })

      $('#popUp .closePopUp').on('click', function(event) {
        event.preventDefault();
        $('#popUp').addClass('hidden');
      });

      $('#sources li a').on('click', function(event) {
        event.preventDefault();
        let source = $(this).html()
        getNews(newsApiBaseUrl+source)
      })
    })
    .fail(function () {
      console.log('whyyyy');
    })
};

function showNews(data) {
  let allArticles = [];
  $('#main').html('');
  data.articles.forEach(function(article, i) {

    let articleData = {
      urlToImage: article.urlToImage,
      url: article.url,
      title: article.title,
      description: article.description,
      source: article.source.name,
    }

    allArticles.push(articleData);

    let html = `
    <article
      data-index = ${i}

    class="article">
      <section class="featuredImage">
        <img src="${article.urlToImage}" alt="" />
      </section>
      <section class="articleContent">
          <a href=""><h3>${article.title}</h3></a>
          <h6>${article.source.name}</h6>
      </section>
      <section class="impressions">
        ${article.source.name}
      </section>
      <div class="clearfix"></div>
    </article>
    `
    $('#main').append(html);
  })
  return allArticles;
}

getNews(newsApiUrl);
