import scss from './lectures.scss';
import css from './javascript.fullPage.css'
import js from './javascript.fullPage.js'
// import evercookiesjs from './evercookies.js'
var checkedItems = [];
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress__bar');
var background = document.getElementsByClassName('background')[0];
var screenFilter = document.getElementsByClassName('screen__filter')[0];
var startButton = document.getElementById('start-button');
var endButton = document.getElementById('end-button');
var lastScrollTop = 0;
var isLarge = true;
var vk;
//SHARE INFO
var template = "Я прошел тест Школы перпективных исследований. Мне рекомендован фильм: ";
var title = '';
var description = '';
var image = '';
var moviesDict = {
  1: {
    title: 'Меланхолия, Ларс фон Триер, 2011'
  },
  2: {
    title: 'Доктор Стрейнджлав, или Как я перестал бояться и полюбил бомбу, Стэнли Кубрик, 1964'
  },
  3: {
    title: 'Экзистенция, Дэвид Кроненберг, 1999'
  },
  4: {
    title: 'Опасный метод, Дэвид Кроненберг, 2011'
  },
  5: {
    title: 'Викинг, Андрей Кравчук, 2017'
  },
  6: {
    title: 'Люмьер и компания, Дэвид Линч и другие, 1995'
  },
  7: {
    title: 'Система безопасности, Сидни Люмет, 1964'
  },
  8: {
    title: 'Древо жизни, Терренс Малик, 2011'
  },
  9: {
    title: 'Туринская лошадь, Бела Тарр и Агнеш Храницки, 2011'
  },
  10: {
    title: 'Плутовство, Барри Левинсон, 1997'
  },
  11: {
    title: 'Гленгарри Глен Росс (Американцы), Джеймс Фоули, 1992'
  },
  12: {
    title: 'Искусственный разум, Стивен Спилберг, 2001'
  },
  13: {
    title: 'Тряпичный союз, Михаил Местецкий, 2015'
  },
  14: {
    title: 'Агора, Алехандро Аменабар, 2009'
  },
  15: {
    title: 'Монти Пайтон и Священный Грааль, Терри Гиллиам, 1975'
  },
  16: {
    title: 'Визит инспектора, Эшлин Уолш, 2015'
  },
  17: {
    title: 'Агора, Алехандро Аменабар, 2009'
  },
  18: {
    title: 'Призрак в доспехах: Невинность, Мамору Осии, 2004'
  }
}
if (window.innerWidth <= 1000) {
  isLarge = false
};

window.onload = () => {
  vk = function(d, id, pr1, pr2) {
    var js = d.createElement("script");
    js.src = "http://vk.com/js/api/share.js?90";
    js.onload = js.onreadystatechange = function() {
      if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
        if (!this.executed) {
          this.executed = true;
          setTimeout(function() {
            d.getElementById(id).innerHTML = VK.Share.button(pr1, pr2);
            VK.Share._base_domain = 'https:' + VK.Share._base_domain;
          }, 0);
        }
      }
    };
    d.documentElement.appendChild(js);
  };

  // document.getElementById('fullpage').fullpage({
  //   anchors: [
  //       'start', 'presentation','test1','test2','test3'
  //     ],
  //   responsiveWidth: 1000
  // });
  if (isLarge) {
    window.setTimeout(() => {
      document.getElementsByClassName('h1_hello')[0].style.opacity = '1';
      document.getElementsByClassName('arrow-down')[0].style.opacity = '1';
    }, 1500);
    initialize('#fullpage', {
      anchors: ['start', 'presentation', 'test1', 'test2', 'test3']
    });
  } else {
    document.getElementsByClassName('h1_hello')[0].style.opacity = '1';
    document.getElementsByClassName('arrow-down')[0].style.opacity = '1';

  }
  document.getElementById('hello-arrow-down').addEventListener('click', ()=>{yaCounter45804912.reachGoal('1_SCREEN_ARROW_CLICKED')});
}

function showButton(button) {
  if (location.hash === "#presentation" || !isLarge) {
    progress.style.display = 'none';
    progressBar.style.display = 'none';
    window.setTimeout(() => {
      button.classList.add('button_visible');
      button.classList.remove('button_hidden');
    }, 2000)
    // yaCounter45804912.hit('/#presentation', {
    //   title: 'presentation',
    //   referer: 'http://advanced.studies.school'
    // });
    // ga('set', 'page', '/#presentation');
    // ga('send', 'pageview');
  }
};
function progressBarHandler() {
  if (location.hash === "#test1" && isLarge) {
    progress.style.display = 'block';
    progressBar.style.display = 'block';
    progressBar.style.width = '33.3%';
    // yaCounter45804912.hit('/#test1', {
    //   title: 'test1',
    //   referer: 'http://advanced.studies.school'
    // });
    // ga('set', 'page', '/#test1');
    // ga('send', 'pageview');
  } else if (location.hash === "#test2" && isLarge) {
    progress.style.display = 'block';
    progressBar.style.display = 'block';
    progressBar.style.width = '66.6%';
    // yaCounter45804912.hit('/#test2', {
    //   title: 'test2',
    //   referer: 'http://advanced.studies.school'
    // });
    // ga('set', 'page', '/#test2');
    // ga('send', 'pageview');
  } else if (location.hash === "#test3" && isLarge) {
    progress.style.display = 'block';
    progressBar.style.display = 'block';
    progressBar.style.width = '100%';
    // yaCounter45804912.hit('/#test3', {
    //   title: 'test3',
    //   referer: 'http://advanced.studies.school'
    // });
    // ga('set', 'page', '/#test3');
    // ga('send', 'pageview');
  } else if (location.hash === "#test-results") {
    progress.style.display = 'none';
    progressBar.style.display = 'none';
    // yaCounter45804912.hit('/#test-results', {
    //   title: 'test-results',
    //   referer: 'http://advanced.studies.school'
    // });
    // ga('set', 'page', '/#test-results');
    // ga('send', 'pageview');
  }
}
function yandexGoals(){
  if (location.hash === "#presentation"){
    yaCounter45804912.reachGoal('2_SCREEN_VISITED');
  }
  else if (location.hash === "#test1"){
    yaCounter45804912.reachGoal('TEST_1_VISITED');
  }
  else if (location.hash === "#test2"){
    yaCounter45804912.reachGoal('TEST_2_VISITED');
  }
  else if (location.hash === "#test3"){
    yaCounter45804912.reachGoal('TEST_3_VISITED');
  }
}
// var sections = document.querySelectorAll('.fp-section');
// var act = document.querySelector('.activeSection');
//
// for (i = 0; i < sections.length; i++) {
//   console.log(sections[i]);
//   visibility : visible;
//   //  sections[i].classList.remove('fp-section');
//   sections[i].style.visibility = 'hidden';
//   sections[i].offsetHeight; // no need to store this anywhere, the reference is enough
//   sections[i].style.opacity = '';
// }
// act.style.visibility='visible';
// act.offsetHeight; // no need to store this anywhere, the reference is enough
// act.style.opacity='1';

var startButton = document.getElementById('start-button');
showButton(startButton);
if ("onhashchange" in window) {
  window.onhashchange = () => {
    showButton(startButton);
    progressBarHandler();
    yandexGoals();
  }
} else {
  window.onload = () => {
    showButton(startButton);
    progressBarHandler();
    yandexGoals();
    document.getElementsByClassName('h1_hello')[0].style.opacity = '1';
  }
}

startButton.addEventListener('click', () => {
  yaCounter45804912.reachGoal('START_PRESSED');
  if (isLarge) {
    progress.style.display = 'block';
    progressBar.style.display = 'block';
  }
  document.getElementById('test1').style.display = 'flex';
  document.getElementById('test2').style.display = 'flex';
  document.getElementById('test3').style.display = 'flex';
  window.location.href = '#test1';
  // background.style.minHeight = documentHeight() + 'px';
  // screenFilter.style.minHeight = documentHeight() + 'px';
})
var listItems = document.querySelectorAll('.test-screen .list-item');
for (var i = 0; i < listItems.length; i++) {
  listItems[i].onclick = function() {
    var index = checkedItems.indexOf(parseInt(this.id));
    if (index !== -1) {
      checkedItems.splice(index, 1);
      this.classList.toggle('list-item_selected');
    } else {
      if (checkedItems.length == 3) {
        alert('Выбери не более 3-х вариантов')
      } else {
        checkedItems.push(parseInt(this.id));
        this.classList.toggle('list-item_selected');
      }
    }
    if (checkedItems.length >= 3) {
      endButton.classList.remove('button_disabled');
    } else {
      endButton.classList.add('button_disabled');
    }
    console.log(checkedItems);
  }
}
endButton.addEventListener('click', () => {
  if (!endButton.classList.contains('button_disabled')) {
    calculateResults();
    document.getElementById('test-results').style.display = 'block';
    window.location.href = '#test-results';
    document.getElementById('test-results').style.visibility = 'visible';
    yaCounter45804912.reachGoal('TEST_FINISHED');
    sendResult(checkedItems);
    //  fullpage.destroy('all');
    //  document.getElementById('test-screen-3').classList.remove('activeSection')
    //  document.getElementById('test-results').classList.add('activeSection');
    // FB.api(
    //    'https://graph.facebook.com/me/og.likes',
    //    'post',
    //    { object: objectToLike,
    //      privacy: {'value': 'SELF'} },
    //    function(response) {
    //      if (!response) {
    //        alert('Error occurred.');
    //      } else if (response.error) {
    //        document.getElementById('result').innerHTML =
    //          'Error: ' + response.error.message;
    //      } else {
    //        document.getElementById('result').innerHTML =
    //          '<a href=\"https://www.facebook.com/me/activity/' +
    //          response.id + '\">' +
    //          'Story created.  ID is ' +
    //          response.id + '</a>';
    //      }
    //    }
    // );

  } else {
    alert("Выбери не менее 3-х вариантов")
  }
})

function calculateResults() {
  var movieIndex = checkedItems[Math.floor(Math.random() * (checkedItems.length - 1))];
  title = moviesDict[movieIndex].title;
  description = moviesDict[movieIndex].title;
  image = 'assets/m' + movieIndex + '.jpg';
  template = "Я прошел тест Школы перпективных исследований. Мне рекомендован фильм: ";
  vk(document, "vk-share", {
    url: document.URL,
    title: template + title,
    description: description,
    image: 'http://advanced.studies.school/' + image,
    noparse: true
  }, {
    type: 'round',
    text: 'Поделиться'
  });

  document.getElementById('results-header').innerHTML = title;
  // document.getElementById('results-descr').innerHTML = description
  document.getElementById('results-img').src = image;
  document.querySelector("meta[property='og\\:title']").content = template + title;
  document.querySelector("meta[property='og\\:description']").content = description;
  document.querySelector("meta[property='og\\:image']").content = image;

}

var agreement = document.getElementById('agreement-checkbox');
var submitButton = document.getElementById('form-subscribe__submit');
if (agreement.checked) {
  submitButton.disabled = false;
} else {
  submitButton.disabled = true;
}
agreement.addEventListener('click', () => {
  if (agreement.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
})
submitButton.addEventListener('click', () => {
  if (!agreement.checked) {
    alert('Пожалуйста, дайте свое согласие на обработку персональных данных')
  }
})

function sendResult(items) {
  console.log(items);
  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  xmlhttp.open("POST", "/sendresult");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(items));
}

document.getElementById('form-subscribe').onsubmit = function(e) {
  e.preventDefault();
  console.log(e);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/subscribe");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({email: e.target.elements.email.value}));
  alert('Благодарим за подписку и до встречи на открытых лекциях!');
};

function documentHeight() {
  return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
}

function socialInit() {

  // window.fbAsyncInit = function() {
  //     FB.init({
  //       appId      : '307669659708408',
  //       xfbml      : true,
  //       version    : 'v2.10'
  //     });
  //     FB.AppEvents.logPageView();
  //   };
  //
  //   (function(d, s, id){
  //      var js, fjs = d.getElementsByTagName(s)[0];
  //      if (d.getElementById(id)) {return;}
  //      js = d.createElement(s); js.id = id;
  //      js.src = "//connect.facebook.net/en_US/sdk.js";
  //      fjs.parentNode.insertBefore(js, fjs);
  //    }(document, 'script', 'facebook-jssdk'));

}
(function(d, w, c) {


  (w[c] = w[c] || []).push(function() {
    try {
      w.yaCounter45804912 = new Ya.Metrika({
        id: 45804912,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true
      });
    } catch (e) {}
  });

  var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function() {
      n.parentNode.insertBefore(s, n);
    };
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js";

  if (w.opera == "[object Opera]") {
    d.addEventListener("DOMContentLoaded", f, false);
  } else {
    f();
  }
})(document, window, "yandex_metrika_callbacks");
