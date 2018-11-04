<style media="screen">
  #pbvContainer .flex {
    display: flex;
  }
  #pbvContainer .none {
    display: none;
  }

  #pbvNav .navContents {
    margin-top: -1px;
    padding: 13px 16px 16px;
    font-weight: 700;
    font-size: 16px;
    color: #999;
    text-decoration: none;
    border-top: 4px solid transparent;
    -webkit-transition: color .2s;
    transition: color .2s;
  }
  #pbvNav .navContents:hover {
    color: #333;
  }
  #pbvNav .navContents.active {
    border-top: 4px solid #0096fa;
    color: #333;
  }

  #pbvMenu {
    margin: 30px 0;
    padding: 0;
  }
  #pbvContainer .mode label {
    display: block;
    margin: auto 5px auto 0;
    cursor: pointer;
  }
  #pbvContainer .mode input {
    cursor: pointer;
  }
  #pbvContainer .aBut {
    display: block;
    margin: auto 0 auto 5px;
    padding: 3px 6px;
    border-radius: 16px;
    background-color: #eee;
    color: #666;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
  }

  #itemList {
    margin: 0 -12px -24px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    list-style: none;
  }
  #itemList li {
    margin: 0 12px 24px;
  }
  #itemList li>div {
    width: 184px;
    margin: 0px;
  }

  #itemList li>div>div:nth-child(1) {
    position: relative;
    margin-bottom: 4px;
  }
  #itemList li>div>div:nth-child(1)>div {
    position: relative;
    width: 184px;
    height: 184px;
  }
  #itemList li>div>div:nth-child(1)>div>a {
    text-decoration: none;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(1) {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    display: flex;
    z-index: 1;
    padding: 4px 4px 0px;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    margin-left: auto;
    height: 20px;
    color: rgb(255, 255, 255);
    font-size: 10px;
    line-height: 12px;
    font-weight: bold;
    flex: 0 0 auto;
    padding: 4px 6px;
    background: rgba(0, 0, 0, 0.32);
    border-radius: 10px;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div>svg {
    stroke: none;
    line-height: 0;
    font-size: 0px;
    width: 9px;
    height: 10px;
    fill: currentcolor;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div>span {
    margin-left: 2px;
  }

  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(2) {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    background-position: center center;
    background-repeat: no-repeat;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)::before {
    content: "";
    position: absolute;
    display: block;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.02);
  }
  #itemList li>div>div:nth-child(1)>div>a:hover>div:nth-child(2) {
    opacity: 0.8;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)>svg {
    width: 48px;
    height: 48px;
    stroke: none;
    fill: rgb(255, 255, 255);
    line-height: 0;
    font-size: 0px;
    vertical-align: middle;
  }
  #itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)>svg circle {
    fill: rgb(0, 0, 0);
    fill-opacity: 0.4;
  }

  #itemList li>div>a:nth-child(2) {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: rgb(31, 31, 31);
    overflow: hidden;
    text-decoration: none;
    transition: color 0.2s ease 0s;
  }
  #itemList li>div>a:nth-child(2):visited {
    color: rgb(173, 173, 173);
  }
  #itemList li>div>a:nth-child(2):hover {
    color: rgb(92, 92, 92);
  }

  #itemList li>div>div:nth-child(3) {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
  }
  #itemList li>div>div:nth-child(3)>div {
    margin-right: 4px;
  }
  #itemList li>div>div:nth-child(3)>div>a {
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-size: cover;
    background-position: top;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
  }
  #itemList li>div>div:nth-child(3)>div>a:before {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.02);
  }

  #itemList li>div>div:nth-child(3)>a {
    display: inline-block;
    line-height: 16px;
    font-size: 12px;
    color: rgb(173, 173, 173);
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    overflow: hidden;
  }

  #iframeBookmark {
    margin: 16px 0;
  }
  #bookmarkReadStrat {
    padding: 8px 14px;
    z-index: 5;
  }
  #pbvContainer .overlayContainer {
    position: relative;
    padding: 10px 0;
  }
  #pbvContainer .overlay {
    position: absolute;
    left: -1%;
    width: 102%;
    height: 100%;
    z-index: 2;
    background: rgba(0,0,0,.2);
  }
</style>


<menu id="pbvMenu" class="flex">
  <div class="mode flex">
    <label>
      <span>登録順</span>
      <input type="radio" id="radioNormal" name="radioMode" checked>
    </label>
    <label>
      <span>ランダム</span>
      <input type="radio" id="radioRandom" name="radioMode">
    </label>
  </div>
  <input type="search" id="inputSearch" value="" placeholder="検索" style="flex-grow:1;">
  <div class="buttons flex">
    <a href="javascript:void(0);" id="inputOr" class="aBut">OR</a>
    <a href="javascript:void(0);" id="inputNot" class="aBut">NOT</a>
  </div>
</menu>
<ul id="itemList"></ul>

<a href="javascript:void(0);" id="navBookmark" class="navContents active">ブックマーク</a>
<a href="javascript:void(0);" id="navOption" class="navContents">オプション</a>

<div id="bookmarkAdd" class="overlayContainer">
  <div class="overlay none"></div>
  <h2>ブックマークの読み込み</h2>
  <div>
    <div class="flex">
      <label>
        <span>ページ数</span>
        <input type="number" id="inputPageCount" value="1" min="1" max="9999">
      </label>
      <a href="javascript:void(0);" id="jumpPageCount" class="aBut">移動</a>
      <div style="flex-grow: 1;"></div>
      <a href="javascript:void(0);" id="jumpOldPage" class="aBut">旧ブックマークページ</a>
      <a href="javascript:void(0);" id="jumpNewPage" class="aBut">新ブックマークページ</a>
    </div>
    <iframe id="iframeBookmark" src="" width="100%" height="320px"></iframe>
  </div>
  <div class="mode flex">
    <label>
      <span>追加</span>
      <input type="radio" id="radioDataAdd" name="radioData" checked>
    </label>
    <label>
      <span>上書き</span>
      <input type="radio" id="radioDataOverwrite" name="radioData">
    </label>
    <div style="flex-grow: 1;"></div>
    <a href="javascript:void(0);" id="bookmarkReadStrat" class="aBut" style="padding: 8px 14px;">開始</a>
  </div>
</div>


<!-- スマホ -->

<style media="screen">
#pbvContainer .flex {
  display: flex;
}
#pbvContainer .none {
  display: none;
}

#pbvMenu {
  margin: 30px 0;
  padding: 0;
}
#pbvContainer .mode label {
  display: block;
  margin: auto 5px auto 0;
  cursor: pointer;
}
#pbvContainer .mode input {
  cursor: pointer;
}
#pbvContainer .aBut {
  display: block;
  margin: auto 0 auto 5px;
  padding: 3px 6px;
  border-radius: 16px;
  background-color: #eee;
  color: #666;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

#itemList>div {
  width: 50%;
  display: inline-block;
  position: relative;
}
#itemList>div>div {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  vertical-align: bottom;
}
#itemList>div>div>a>div {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  overflow: hidden;
}
#itemList>div>div>a>div>div.square {
  display: block;
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  opacity: 0;
}
#itemList>div>div>a>div>div.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
}
#itemList>div>div>a>div>div>div {
  position: absolute;
  top: 4px;
  right: 4px;
  display: inline-block;
  background: rgba(0,0,0,.4);
  line-height: 19px;
  color: #fff;
  padding: 0 6px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
}
#itemList>div>div>a>div>div>div>img {
  vertical-align: middle;
  height: 9px;
  margin-right: 3px;
}

#moreLoad {
  width: 100%;
}

#bookmarkAdd .aBut {
  margin: 5px;
  flex-grow: 1;
}
#bookmarkAdd label {
  margin: auto;
}
#bookmarkAdd .iframeContainer {
  width: 100%;
  height: 320px;
  margin: 16px 0;
  overflow: hidden;
}
#pbvContainer .overlayContainer {
  position: relative;
  padding: 10px 0;
}
#pbvContainer .overlay {
  position: absolute;
  left: -1%;
  width: 102%;
  height: 100%;
  z-index: 2;
  background: rgba(0,0,0,.2);
}
#bookmarkReadStrat {
  padding: 8px 14px;
  z-index: 5;
}
</style>

<menu id="pbvMenu">
  <div class="flex" style="display:flex;">
    <input type="search" id="inputSearch" value="" placeholder="検索" style="flex-grow:1;">
    <a href="javascript:void(0);" id="inputOr" class="aBut">OR</a>
    <a href="javascript:void(0);" id="inputNot" class="aBut">NOT</a>
  </div>
  <div class="mode flex">
    <label>
      <span>登録順</span>
      <input type="radio" id="radioNormal" name="radioMode" checked>
    </label>
    <label>
      <span>ランダム</span>
      <input type="radio" id="radioRandom" name="radioMode">
    </label>
  </div>
</menu>
<span id="itemList"></span>
<input type="button" id="moreLoad" value="さらに読み込む">


<a href="javascript:void(0);" id="navBookmark" class="active">ブックマーク</a>
<a href="javascript:void(0);" id="navOption" class="">オプション</a>

<div>
  <a href="#" target="_blank">
    <div>
      <div class="square"></div>
      <div class="image" style="background-image: url();">
        <div style="display: none;">
          <img src="https://s.pximg.net/touch/touch/js/bundle/3aae66ac7716524f2fe9a06e93437786.svg">
          <span>123</span>
        </div>
      </div>
    </div>
  </a>
</div>

<div id="bookmarkAdd" class="overlayContainer">
  <div class="overlay none"></div>
  <h2>ブックマークの読み込み</h2>
  <div class="flex">
    <a href="javascript:void(0);" id="jumpOldPage" class="aBut">旧ブックマークページ</a>
    <a href="javascript:void(0);" id="jumpNewPage" class="aBut">新ブックマークページ</a>
  </div>
  <div class="flex">
    <label>
      <span>ページ数</span>
      <input type="number" id="inputPageCount" value="1" min="1" max="9999">
    </label>
    <div style="flex-grow: 1;"></div>
    <a href="javascript:void(0);" id="jumpPageCount" class="aBut">移動</a>
  </div>
  <div class="iframeContainer">
    <iframe id="iframeBookmark" src="" width="100%" height="320px"></iframe>
  </div>
  <div class="mode flex">
    <label>
      <span>追加</span>
      <input type="radio" id="radioDataAdd" name="radioData" checked>
    </label>
    <label>
      <span>上書き</span>
      <input type="radio" id="radioDataOverwrite" name="radioData">
    </label>
    <div style="flex-grow: 1;"></div>
    <a href="javascript:void(0);" id="bookmarkReadStrat" class="aBut" style="padding: 8px 14px;">開始</a>
  </div>
</div>
