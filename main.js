(() => {
var NEW_PAGE_LI_QUERY = '#root ul.xq6AsQu.KvF6Ntf li';

var pc = (() => {
  if (document.getElementById('root')) return true;
  return false;
})();

// スクロール位置を測定する要素を設定
var documentElement = (() => {
  // Webkit系（Safari, Chrome, iOS）判定
  if (navigator.userAgent.toLowerCase().match(/webkit|msie 5/)) {
    if(navigator.userAgent.indexOf('Chrome') != -1){
      // Chromeはhtml要素
      return document.documentElement;
    }
    else {
      // Chrome以外はbody要素
      return document.body;
    }
  }
  else {
    // IE（6以上）、Firefox、Operaはhtml要素
    return document.documentElement;
  }
})();

var pbvStyle = (() => {
  if (pc) {
    return '#pbvContainer .flex {display: flex;}#pbvContainer .none {display: none;}#pbvNav .navContents {margin-top: -1px;padding: 13px 16px 16px;font-weight: 700;font-size: 16px;color: #999;text-decoration: none;border-top: 4px solid transparent;-webkit-transition: color .2s;transition: color .2s;}#pbvNav .navContents:hover {color: #333;}#pbvNav .navContents.active {border-top: 4px solid #0096fa;color: #333;}#pbvMenu {margin: 30px 0;padding: 0;}#pbvContainer .mode label {display: block;margin: auto 5px auto 0;cursor: pointer;}#pbvContainer .mode input {cursor: pointer;}#pbvContainer .aBut {display: block;margin: auto 0 auto 5px;padding: 3px 6px;border-radius: 16px;background-color: #eee;color: #666;cursor: pointer;text-align: center;text-decoration: none;}#itemList {margin: 0 -12px -24px;padding: 0;display: flex;flex-wrap: wrap;align-content: flex-start;list-style: none;}#itemList li {margin: 0 12px 24px;}#itemList li>div {width: 184px;margin: 0px;}#itemList li>div>div:nth-child(1) {position: relative;margin-bottom: 4px;}#itemList li>div>div:nth-child(1)>div {position: relative;width: 184px;height: 184px;}#itemList li>div>div:nth-child(1)>div>a {text-decoration: none;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1) {position: absolute;top: 0px;left: 0px;right: 0px;box-sizing: border-box;display: flex;z-index: 1;padding: 4px 4px 0px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(1) {display: flex;flex-flow: row wrap;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(1)>div {margin: 2px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(1)>div>div {color: rgb(255, 255, 255);font-weight: bold;font-size: 10px;line-height: 1;padding: 3px 6px;border-radius: 3px;background: rgb(255, 64, 96);}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(2) {display: flex;-webkit-box-align: center;align-items: center;box-sizing: border-box;margin-left: auto;height: 20px;color: rgb(255, 255, 255);font-size: 10px;line-height: 12px;font-weight: bold;flex: 0 0 auto;padding: 4px 6px;background: rgba(0, 0, 0, 0.32);border-radius: 10px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(2)>svg {stroke: none;line-height: 0;font-size: 0px;width: 9px;height: 10px;fill: currentcolor;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(2)>span {margin-left: 2px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2) {display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;width: 100%;height: 100%;background-size: cover;background-color: rgb(255, 255, 255);border-radius: 4px;background-position: center center;background-repeat: no-repeat;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)::before {content: "";position: absolute;display: block;top: 0px;left: 0px;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.02);}#itemList li>div>div:nth-child(1)>div>a:hover>div:nth-child(2) {opacity: 0.8;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)>svg {width: 48px;height: 48px;stroke: none;fill: rgb(255, 255, 255);line-height: 0;font-size: 0px;vertical-align: middle;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)>svg circle {fill: rgb(0, 0, 0);fill-opacity: 0.4;}#itemList li>div>a:nth-child(2) {display: inline-block;max-width: 100%;text-overflow: ellipsis;white-space: nowrap;line-height: 22px;font-size: 14px;font-weight: bold;color: rgb(31, 31, 31);overflow: hidden;text-decoration: none;transition: color 0.2s ease 0s;}#itemList li>div>a:nth-child(2):visited {color: rgb(173, 173, 173);}#itemList li>div>a:nth-child(2):hover {color: rgb(92, 92, 92);}#itemList li>div>div:nth-child(3) {display: flex;-webkit-box-align: center;align-items: center;width: 100%;}#itemList li>div>div:nth-child(3)>div {margin-right: 4px;}#itemList li>div>div:nth-child(3)>div>a {position: relative;display: block;width: 16px;height: 16px;border-radius: 50%;background-size: cover;background-position: top;-webkit-box-flex: 0;-webkit-flex: none;flex: none;}#itemList li>div>div:nth-child(3)>div>a:before {position: absolute;display: block;content: "";top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,.02);}#itemList li>div>div:nth-child(3)>a {display: inline-block;line-height: 16px;font-size: 12px;color: rgb(173, 173, 173);text-overflow: ellipsis;white-space: nowrap;text-decoration: none;overflow: hidden;}#iframeBookmark {margin: 16px 0;}#bookmarkReadStrat {padding: 8px 14px;z-index: 5;}#pbvContainer .overlayContainer {position: relative;padding: 10px 0;}#pbvContainer .overlay {position: absolute;left: -1%;width: 102%;height: 100%;z-index: 2;background: rgba(0,0,0,.2);}#dataOption .textareaContainer {width: 100%;height: 320px;}#optionTextarea {width: 100%;height: 100%;}#dataOption .butContainer {margin: 20px 0;padding: 0 0 10px 0;}#dataOption .aBut {margin: auto 5px auto 0;}';
  }
  return '#pbvContainer .flex {display: flex;}#pbvContainer .none {display: none;}#pbvMenu {margin: 30px 0;padding: 0;}#pbvContainer .mode label {display: block;margin: auto 5px auto 0;cursor: pointer;}#pbvContainer .mode input {cursor: pointer;}#pbvContainer .aBut {display: block;margin: auto 0 auto 5px;padding: 3px 6px;border-radius: 16px;background-color: #eee;color: #666;cursor: pointer;text-align: center;text-decoration: none;}#itemList>div {width: 50%;display: inline-block;position: relative;}#itemList>div>div {display: inline-block;box-sizing: border-box;position: relative;width: 100%;vertical-align: bottom;}#itemList>div>div>a>div {width: 100%;height: 100%;position: relative;background: #fff;overflow: hidden;}#itemList>div>div>a>div>div.square {display: block;height: 0;width: 100%;padding-bottom: 100%;opacity: 0;}#itemList>div>div>a>div>div.image {position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-size: cover;}#itemList>div>div>a>div>div.image>div.count {position: absolute;top: 4px;right: 4px;display: inline-block;margin: 0;padding: 0 6px;line-height: 19px;color: #fff;background: rgba(0,0,0,.4);border-radius: 20px;font-size: 10px;font-weight: 700;}#itemList>div>div>a>div>div.image>div.count>img {vertical-align: middle;height: 9px;margin-right: 3px;}#itemList>div>div>a>div>div.image>div.ugoku {position: absolute;top: 50%;left: 50%;width: 32%;height: 32%;background: rgba(0,0,0,.4);border-radius: 100%;-webkit-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);}#itemList>div>div>a>div>div.image>div.ugoku>img {position: absolute;top: 50%;left: 50%;height: 45%;-webkit-transform: translateX(-37.5%) translateY(-50%);transform: translateX(-37.5%) translateY(-50%);}#bookmarkAdd .aBut {margin: 5px;flex-grow: 1;}#bookmarkAdd label {margin: auto;}#bookmarkAdd .iframeContainer {width: 100%;height: 320px;margin: 16px 0;overflow: scroll;}#pbvContainer .overlayContainer {position: relative;padding: 10px 0;}#pbvContainer .overlay {position: absolute;left: -1%;width: 102%;height: 100%;z-index: 2;background: rgba(0,0,0,.2);}#bookmarkReadStrat {padding: 8px 14px;z-index: 5;}#dataOption .textareaContainer {width: 100%;height: 320px;}#optionTextarea {width: 100%;height: 100%;}#dataOption .butContainer {margin: 20px 0;padding: 0 0 10px 0;}#dataOption .aBut {margin: auto 5px auto 0;}';
})();
var pbvNav = (() => {
  return '<a href="javascript:void(0);" id="navBookmark" class="navContents active">ブックマーク</a><a href="javascript:void(0);" id="navOption" class="navContents">オプション</a>';
})();
var pbvBookmarkHTML = (() => {
  if (pc) {
    return '<menu id="pbvMenu" class="flex"><div class="mode flex"><label><span>登録順</span><input type="radio" id="radioNormal" name="radioMode" checked></label><label><span>ランダム</span><input type="radio" id="radioRandom" name="radioMode"></label></div><input type="search" id="inputSearch" value="" placeholder="検索" style="flex-grow:1;"><div class="buttons flex"><a href="javascript:void(0);" id="inputOr" class="aBut">OR</a><a href="javascript:void(0);" id="inputNot" class="aBut">NOT</a></div></menu><ul id="itemList"></ul>';
  }
  return '<menu id="pbvMenu"><div class="flex" style="display:flex;"><input type="search" id="inputSearch" value="" placeholder="検索" style="flex-grow:1;"><a href="javascript:void(0);" id="inputOr" class="aBut">OR</a><a href="javascript:void(0);" id="inputNot" class="aBut">NOT</a></div><div class="mode flex"><label><span>登録順</span><input type="radio" id="radioNormal" name="radioMode" checked></label><label><span>ランダム</span><input type="radio" id="radioRandom" name="radioMode"></label></div></menu><span id="itemList"></span>';
})();
var pbvOptionHTML = (() => {
  if (pc) {
    return '<div id="bookmarkAdd" class="overlayContainer"><div class="overlay none"></div><h2>ブックマークの読み込み</h2><div><div class="flex"><label><span>ページ数</span><input type="number" id="inputPageCount" value="1" min="1" max="9999"></label><a href="javascript:void(0);" id="jumpPageCount" class="aBut">移動</a><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="jumpOldPage" class="aBut">旧ブックマークページ</a><a href="javascript:void(0);" id="jumpNewPage" class="aBut">新ブックマークページ</a></div><iframe id="iframeBookmark" src="" width="100%" height="320px"></iframe></div><div class="mode flex"><label><span>追加</span><input type="radio" id="radioDataAdd" name="radioData" checked></label><label><span>上書き</span><input type="radio" id="radioDataOverwrite" name="radioData"></label><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="bookmarkReadStrat" class="aBut" style="padding: 8px 14px;">開始</a></div></div><div id="dataOption"><h2>データの管理</h2><div class="textareaContainer"><textarea id="optionTextarea"></textarea></div><div class="butContainer flex"><a href="javascript:void(0);" id="butDataShow" class="aBut">データの表示</a><a href="javascript:void(0);" id="butDataOverwrite" class="aBut">データの上書き</a></div></div>';
  }
  return '<div id="bookmarkAdd" class="overlayContainer"><div class="overlay none"></div><h2>ブックマークの読み込み</h2><div class="flex"><a href="javascript:void(0);" id="jumpOldPage" class="aBut">旧ブックマークページ</a><a href="javascript:void(0);" id="jumpNewPage" class="aBut">新ブックマークページ</a></div><div class="flex"><label><span>ページ数</span><input type="number" id="inputPageCount" value="1" min="1" max="9999"></label><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="jumpPageCount" class="aBut">移動</a></div><div class="iframeContainer"><iframe id="iframeBookmark" src="" width="100%" height="320px"></iframe></div><div class="mode flex"><label><span>追加</span><input type="radio" id="radioDataAdd" name="radioData" checked></label><label><span>上書き</span><input type="radio" id="radioDataOverwrite" name="radioData"></label><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="bookmarkReadStrat" class="aBut" style="padding: 8px 14px;">開始</a></div></div><div id="dataOption"><h2>データの管理</h2><div class="textareaContainer"><textarea id="optionTextarea"></textarea></div><div class="butContainer flex"><a href="javascript:void(0);" id="butDataShow" class="aBut">データの表示</a><a href="javascript:void(0);" id="butDataOverwrite" class="aBut">データの上書き</a></div></div>';
})();

var page = 'bookmark';

var bookmarkData = (() => {
  var d = JSON.parse(localStorage.getItem('pbvBookmarkData'));
  if (d != null) return d;
  return [];
})();
var randomData = [];
var searchData = [];

var userIcon = (() => {
  var d = JSON.parse(localStorage.getItem('pbvUserData'));
  if (d != null) return d;
  return {};
})();

var addData = [];

var bookmarkViewMode = 'normal';
var loadCount = 0; // 何回目の読み込みか
var viewCount = 48; // 一回のロードで何枚読み込むか
var illustLoadMargin = 0; // 読み込む範囲

var addMode = 'add';
var bookmarkAddPage = '';
var bookmarkAddPageCount = 1;
var reading = false;

var container;

// scroll
window.onscroll = () => {
  if (page != 'bookmark') return;
  appendItemToBottom();
};

/* == */

function resetHTML() {
  if (pc) {
    // remove
    var removeDiv = document.querySelectorAll('#root>div:nth-child(2)>div>div:nth-child(2)>div');
    for (var i = 0; i < removeDiv.length; i++) {
      removeDiv[i].parentNode.removeChild(removeDiv[i]);
    }

    // style
    var addStyle = document.createElement('style');
    var rule = document.createTextNode(pbvStyle);
    addStyle.media = 'screen';
    addStyle.type = 'text/css';
    addStyle.appendChild(rule);
    document.head.appendChild(addStyle);

    // content
    container = document.createElement('div');
    container.id = 'pbvContainer';
    container.style.margin = '0 auto 96px';
    container.style.maxWidth = '1224px';
    container.innerHTML = pbvBookmarkHTML;
    document.querySelector('#root>div:nth-child(2)>div>div:nth-child(2)').appendChild(container);
  }
  else {
    // style
    var addStyle = document.createElement('style');
    var rule = document.createTextNode(pbvStyle);
    addStyle.media = 'screen';
    addStyle.type = 'text/css';
    addStyle.appendChild(rule);
    document.head.appendChild(addStyle);

    // content
    container = document.querySelector('#contents>div>div:nth-child(2)>div:nth-child(6)');
    container.id = 'pbvContainer';
    container.innerHTML = pbvBookmarkHTML;
  }
  // nav
  var nav = container.previousElementSibling;
  nav.id = 'pbvNav'
  nav.innerHTML = pbvNav;

  // nav event
  var navBookmark = document.getElementById('navBookmark');
  var navOption = document.getElementById('navOption');
  navBookmark.addEventListener('click', () => {
    if (page == 'bookmark') return;
    navBookmark.classList.add('active');
    navOption.classList.remove('active');
    page = 'bookmark';
    changePage();
    setEvent();
  }, false);
  navOption.addEventListener('click', () => {
    if (page == 'option') return;
    navOption.classList.add('active');
    navBookmark.classList.remove('active');
    page = 'option';
    changePage();
    setEvent();
  }, false);
}
resetHTML();

function changePage() {
  container.innerHTML = (() => {
    if (page == 'bookmark') return pbvBookmarkHTML;
    return pbvOptionHTML;
  })();

  if (page == 'bookmark') {
    bookmarkViewMode = 'normal';
    loadCount = 0;
    addItem();
  }
  else {
    addMode = 'add';
    bookmarkPage = '';
    bookmarkAddPage = '';
    bookmarkAddPageCount = 1;
    reading = false;
    document.getElementById("optionTextarea").placeholder = "「データの表示」　ここに現在のデータを表示します。\n\n「データの上書き」　ここに書かれたデータを現在のデータに上書きします。";
  }
};

var iframeTimer;
function setEvent() {
  if (page == 'bookmark') {
    // iframeTimer
    clearInterval(iframeTimer);

    var element;

    // radioNormal
    element = document.getElementById('radioNormal');
    element.addEventListener('click', () => {
      bookmarkViewMode = 'normal';
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      addItem();
    }, false);
    // radioRandom
    element = document.getElementById('radioRandom');
    element.addEventListener('click', () => {
      bookmarkViewMode = 'random';
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      createRandomData()
      .then(() => {
        addItem();
      });
    }, false);

    // inputSearch
    element = document.getElementById('inputSearch');
    element.addEventListener('change', () => {
      bookmarkViewMode = 'search';
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      searchBoxChange()
      .then(() => {
        console.log(searchData);
        addItem();
      });
    }, false);

    // inputOr
    element = document.getElementById('inputOr');
    element.addEventListener('click', () => {
      var inputSearch = document.getElementById('inputSearch');
      if (inputSearch.value != '') inputSearch.value += ' ';
      inputSearch.value += 'OR ';
    }, false);
    // inputNot
    element = document.getElementById('inputNot');
    element.addEventListener('click', () => {
      var inputSearch = document.getElementById('inputSearch');
      if (inputSearch.value != '') inputSearch.value += ' ';
      inputSearch.value += 'NOT ';
    }, false);
  }
  else {
    // iframeTimer
    iframeTimer = setInterval(() => {
      changeBookmarkAddPageCount();
    }, 1000);

    var element;

    // jumpPageCount
    element = document.getElementById('jumpPageCount');
    element.addEventListener('click', () => {
      bookmarkAddPageChange();
    }, false);
    // jumpOldPage
    element = document.getElementById('jumpOldPage');
    element.addEventListener('click', () => {
      bookmarkAddPage = 'old';
      bookmarkAddPageChange();
    }, false);
    // jumpNewPage
    element = document.getElementById('jumpNewPage');
    element.addEventListener('click', () => {
      bookmarkAddPage = 'new';
      bookmarkAddPageChange();
    }, false);

    // radioDataAdd
    element = document.getElementById('radioDataAdd');
    element.addEventListener('click', () => {
      addMode = (() => {
        var add = document.getElementById('radioDataAdd').checked;
        if (add) return 'add';
        return 'overwrite';
      })();
    }, false);
    // radioDataOverwrite
    element = document.getElementById('radioDataOverwrite');
    element.addEventListener('click', () => {
      addMode = (() => {
        var add = document.getElementById('radioDataAdd').checked;
        if (add) return 'add';
        return 'overwrite';
      })();
    }, false);

    // bookmarkReadStrat
    element = document.getElementById('bookmarkReadStrat');
    element.addEventListener('click', () => {
      var iframe = document.getElementById('iframeBookmark');
      var url = iframe.contentWindow.location.href;
      if (url == 'about:blank') return;

      if (reading == false) {
        reading = true;

        var overlay = document.querySelector('#pbvContainer .overlay');
        overlay.classList.remove('none');

        var but = document.getElementById('bookmarkReadStrat');
        but.textContent = '中止';

        addData = [];

        bookmarkAddPageCount++;
        clearInterval(iframeTimer);
        iframeTimer = setInterval(() => {
          readBookmarkPageData();
        }, 1500);
      }
      else {
        reading = false;

        var overlay = document.querySelector('#pbvContainer .overlay');
        overlay.classList.add('none');

        var but = document.getElementById('bookmarkReadStrat');
        but.textContent = '開始';

        clearInterval(iframeTimer);
        iframeTimer = setInterval(() => {
          changeBookmarkAddPageCount();
        }, 1000);
      }
    }, false);

    // butDataShow
    element = document.getElementById('butDataShow');
    element.addEventListener('click', () => {
      showBookmarkData();
    }, false);
    // butDataOverwrite
    element = document.getElementById('butDataOverwrite');
    element.addEventListener('click', () => {
      overwriteBookmarkData();
    }, false);
  }
};
setEvent();

function saveToLocalStorage() {
  localStorage.setItem('pbvBookmarkData', JSON.stringify(bookmarkData));
  localStorage.setItem('pbvUserData', JSON.stringify(userIcon));
}

function getParameter(url) {
  var arg = {};
  var pair = url.split('?')[1].split('&');
  for(var i = 0; pair[i]; i++) {
    var kv = pair[i].split('=');
    arg[kv[0]] = kv[1];
  }
  return arg;
}

/* bookmark */

function addItem() {
  for (var i = 0; i < viewCount; i++) {
    var index = i + (loadCount * viewCount);
    var data = (() => {
      if (bookmarkViewMode == 'normal') return bookmarkData[index];
      if (bookmarkViewMode == 'random') return randomData[index];
      return searchData[index];
    })();
    createItem(data);
  }
};
addItem();

function createItem(data) {
  if (data == undefined) return;

  var isCount = (() => {
    if (data.count == '0') return 'display: none;';
    return '';
  })();
  var isR18 = (() => {
    var b = data.tags.some((value) => {
      return value == 'R-18' || value == 'R-18G';
    });
    if (!b) return 'display: none;';
    return '';
  })();
  var r18Text = (() => {
    if (isR18 != '') return '';
    var b = data.tags.some((value) => {
      return value == 'R-18';
    });
    if (b) return 'R-18';
    return 'R-18G';
  })();
  var isUgoku = (() => {
    if (data.ugoku) return '';
    return 'display: none;';
  })();

  var itemList = document.getElementById('itemList');
  var child = (() => {
    if (pc) return document.createElement('li');
    return document.createElement('div');
  })();

  child.classList.add('item');

  child.innerHTML = (() => {
    if (pc) {
      return '<div>' +
      '  <div>' +
      '    <div>' +
      '      <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + data.id + '" target="_blank">' +
      '        <div>' +
      '          <div style="' + isR18 + '">' +
      '            <div>' +
      '              <div>' + r18Text + '</div>' +
      '            </div>' +
      '          </div>' +
      '          <div style="' + isCount + '">' +
      '            <svg>' +
      '              <path d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10 C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1 C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8 0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z"></path>' +
      '            </svg>' +
      '            <span>' + data.count + '</span>' +
      '          </div>' +
      '        </div>' +
      '        <div style="background-image: url(https://i.pximg.net/c/250x250_80_a2/img-master/img/' + data.imageUrl + ');">' +
      '          <svg viewBox="0 0 24 24" style="' + isUgoku + '">' +
      '            <circle cx="12" cy="12" r="10"></circle>' +
      '            <path d="M9,8.74841664 L9,15.2515834 C9,15.8038681 9.44771525,16.2515834 10,16.2515834 C10.1782928,16.2515834 10.3533435,16.2039156 10.5070201,16.1135176 L16.0347118,12.8619342 C16.510745,12.5819147 16.6696454,11.969013 16.3896259,11.4929799 C16.3034179,11.3464262 16.1812655,11.2242738 16.0347118,11.1380658 L10.5070201,7.88648243 C10.030987,7.60646294 9.41808527,7.76536339 9.13806578,8.24139652 C9.04766776,8.39507316 9,8.57012386 9,8.74841664 Z"></path>' +
      '          </svg>' +
      '        </div>' +
      '      </a>' +
      '    </div>' +
      '  </div>' +
      '  <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + data.id + '" target="_blank">' + data.title + '</a>' +
      '  <div>' +
      '    <div>' +
      '      <a href="https://www.pixiv.net/member.php?id=' + data.userId + '" target="_blank" style="background-image: url(' + data.userIconUrl + ');"></a>' +
      '    </div>' +
      '    <a href="https://www.pixiv.net/member.php?id=' + data.userId + '" target="_blank">' + data.user + '</a>' +
      '  </div>' +
      '</div>';
    }
    return '<div>' +
    '  <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + data.id + '" target="_blank">' +
    '    <div>' +
    '      <div class="square"></div>' +
    '      <div class="image" style="background-image: url(https://i.pximg.net/c/540x540_70/img-master/img/' + data.imageUrl + ');">' +
    '        <div class="count" style="' + isCount + '">' +
    '          <img src="https://s.pximg.net/touch/touch/js/bundle/3aae66ac7716524f2fe9a06e93437786.svg">' +
    '          <span>' + data.count + '</span>' +
    '        </div>' +
    '        <div class="ugoku" style="' + isUgoku + '">' +
    '          <img src="https://s.pximg.net/touch/touch/js/bundle/4f2163600b6b407f10d6c835140d1fcb.svg">' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '  </a>' +
    '</div>';
  })();

  itemList.appendChild(child);
};

function appendItemToBottom() {
  if (pc) {
    var bottomElement = document.querySelector('#itemList .item:last-child');
    if (!bottomElement) return;
    var screenBottom = (documentElement.scrollTop + documentElement.clientHeight);
    var lastItemOffset = (bottomElement.offsetTop - documentElement.offsetTop);

    if(lastItemOffset < (screenBottom + illustLoadMargin)) {
      loadCount++;
      addItem();
    }
  }
  else {
    // 垂直スクロール量を取得する
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    // 表示領域の高さを取得する
    var clientHeight = document.body.clientHeight;

    // スクロールバーで隠れた領域を含むコンテンツ領域の高さを取得する
    var scrollHeight = document.body.scrollHeight || document.docomentElement.scrollHeight;

    // Firefox・Chrome対応
    if(scrollHeight === clientHeight) {
      clientHeight = window.innerHeight;
    }

    // コンテンツ領域の底までの残り領域
    var remain = scrollHeight - clientHeight - scrollTop;

    // 一番下までスクロールされたら
    if(remain <= 0) {
      loadCount++;
      addItem();
    }
  }
}

function createRandomData() {
  return new Promise(function(resolve, reject) {
    randomData = JSON.parse(JSON.stringify(bookmarkData));
    for(var i = randomData.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = randomData[i];
      randomData[i] = randomData[r];
      randomData[r] = tmp;
    }
    resolve();
  });
}
createRandomData();

function searchBoxChange() {
  return new Promise(function(resolve, reject) {
    // 検索用の配列を空にしておく
    searchData = [];
    // 検索欄内の文字列
    var searchBox = document.getElementById('inputSearch').value;
    // 空文字の場合は帰す
    if (searchBox == '') {
      bookmarkViewMode = 'normal';
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      addItem();
      return;
    }

    // 使う配列
    var arr = [];

    if (bookmarkViewMode == 'random') { arr = randomData; }
    else { arr = bookmarkData; }

    var searchTexts = searchBox.replace(/　/g , ' ').split(' ');

    var condition = [[]];
    for (var i = 0; i < searchTexts.length; i++) {
      if (searchTexts[i] != 'AND'
      && searchTexts[i] != 'OR'
      && searchTexts[i] != 'NOT'
    ) {
      if (searchTexts[i - 1] == 'OR') {
        condition.push([searchTexts[i]]);
      }
      else if (searchTexts[i - 1] == 'NOT') {
        condition[condition.length - 1].push('-' + searchTexts[i]);
      }
      else {
        condition[condition.length - 1].push(searchTexts[i]);
      }
    }
  }

    var compile = function (cond) {
      var joinAnd = function (arr) { return '^(?=[\\s\\S]*' + arr.join(')(?=[\\s\\S]*') + ')'; };
      var joinOr  = function (arr) { return '(?:' + arr.join('|') + ')'; };
      var escape  = function (str) { return str.replace(/(?=[(){}\[\].*\\^$?])/, '\\'); };
      var rx = joinOr(cond.map(function(inner) { return joinAnd(inner.map(escape)); }));
      rx = rx.replace(/=\[\\s\\S\]\*-/g, '![\\s\\S]*');
      return new RegExp(rx);
    };
    var matcher = compile(condition);

    for (var i = 0; i < arr.length; i++) {
      var testStr = arr[i]['title'] + ' ' + arr[i]['user'] + ' ' + arr[i]['tags'].join();

      if (matcher.test(testStr)) {
        searchData.push(arr[i]);
      }
    }

    resolve();
  });
}

/* option */

function bookmarkAddPageChange() {
  bookmarkAddPageCount = document.getElementById('inputPageCount').value;

  var url = (() => {
    if (bookmarkAddPage == 'old') return 'https://www.pixiv.net/bookmark.php?rest=show&p=' + bookmarkAddPageCount;
    if (bookmarkAddPage == 'new') return 'https://www.pixiv.net/bookmark.php?id=9791957&rest=show&p=' + bookmarkAddPageCount;
    return '';
  })();

  if (url == '') return;

  var iframeBookmark = document.getElementById('iframeBookmark');

  if (pc) {
    iframeBookmark.src = url;
  }
  else {
    iframeBookmark.src = 'https://www.pixiv.net/redirect_pc.php';
    setTimeout(function () {
      iframeBookmark.src = url;
    }, 1000);
  }
}

function changeBookmarkAddPageCount() {
  var iframe = document.getElementById('iframeBookmark');
  var url = iframe.contentWindow.location.href;

  if (url == 'about:blank') return false;

  var parameter = getParameter(url);
  var p = (() => {
    if (parameter.p) return +parameter.p;
    return 1;
  })();

  if (p == bookmarkAddPageCount) return false;

  bookmarkAddPageCount = p;
  var inputPageCount = document.getElementById('inputPageCount');
  inputPageCount.value = p;
  return p;
}

function readBookmarkPageData() {
  var p = changeBookmarkAddPageCount();
  if (!p) return;
  var iframe = document.getElementById('iframeBookmark');
  var iframeDoc = iframe.contentWindow.document;

  if (bookmarkAddPage == 'old') {
    var imgItem = iframeDoc.querySelectorAll('.js-legacy-mark-unmark-list .image-item');
    for (var i = imgItem.length - 1; i >= 0; i--) {
      try {
        var imgElement = imgItem[i].getElementsByClassName('ui-scroll-view')[0];
        var data = {};
        data.title = imgItem[i].getElementsByClassName('title')[0].getAttribute('title');
        data.user = imgItem[i].getElementsByClassName('user')[0].getAttribute('data-user_name');
        data.id = imgElement.getAttribute('data-id');
        data.userId = imgItem[i].getElementsByClassName('user')[0].getAttribute('data-user_id');
        data.count = (() => {
          if (imgItem[i].querySelector('.page-count span')) return imgItem[i].querySelector('.page-count span').textContent;
          return '0';
        })();
        data.imageUrl = imgElement.getAttribute('data-src').replace(/^.+?img\/(.+?)master(.+?)$/, '$1square$2');
        data.userIconUrl = '';
        data.ugoku = imgItem[i].getElementsByClassName('work')[0].classList.contains('ugoku-illust');
        data.tags = imgElement.getAttribute('data-tags').split(' ');
        addData.unshift(data);
      }
      catch (e) {
        // console.error(e);
      }
    }
  }
  else {
    var imgItem = iframeDoc.querySelectorAll(NEW_PAGE_LI_QUERY);
    for (var i = imgItem.length - 1; i >= 0; i--) {
      try {
        var a = imgItem[i].querySelectorAll('a')[2];
        var id = a.href.match(/(\w+)$/)[1];
        userIcon[id] = a.style.backgroundImage.match(/"(.+)"/)[1];
      }
      catch (e) {
        // console.error(e);
      }
    }
  }

  if (p > 1) {
    p--;
    var url = (() => {
      if (bookmarkAddPage == 'old') return 'https://www.pixiv.net/bookmark.php?rest=show&p=' + p;
      if (bookmarkAddPage == 'new') return 'https://www.pixiv.net/bookmark.php?id=9791957&rest=show&p=' + p;
      return '';
    })();
    iframe.src = url;
  }
  else {
    new Promise(resolve => {
      if (bookmarkAddPage == 'old') {
        if (addMode == 'add') {
          addBookmarkData();
        }
        else {
          bookmarkData = addData;
        }
      }
      resolve();
    })
    .then(() => {
      return new Promise(resolve => {
        setUserIconUrl();
        resolve();
      });
    })
    .then(() => {
      saveToLocalStorage();
      var but = document.getElementById('bookmarkReadStrat');
      but.click();
    });
  }
}

function addBookmarkData() {
  if (bookmarkData.length < 1) return;

  var overIndex = addData.length;
  for (var i = 0; i < addData.length; i++) {
    if (addData[i].id == bookmarkData[0].id) {
      overIndex = i;
    }
  }
  addData.splice(overIndex, addData.length - overIndex);
  bookmarkData = addData.concat(bookmarkData);
}

function setUserIconUrl() {
  if (bookmarkData == []) return;
  for (key in userIcon) {
    bookmarkData.forEach((e) => {
      if (e.userId == key) {
        e.userIconUrl = userIcon[key];
      }
    });
  }
}

function showBookmarkData() {
  var confirm = window.confirm('データを表示します。');
  if (!confirm) return;

  var optionTextarea = document.getElementById('optionTextarea');
  optionTextarea.value = JSON.stringify(bookmarkData);
}

function overwriteBookmarkData() {
  var confirm = window.confirm('データを上書きします。');
  if (!confirm) return;

  var optionTextarea = document.getElementById('optionTextarea');
  if (optionTextarea.value == '') return;

  var data;
  try {
    data = JSON.parse(optionTextarea.value);
    bookmarkData = data;
    saveToLocalStorage();
  }
  catch (e) {
    alert('データが無効です。');
  }
}

})();
