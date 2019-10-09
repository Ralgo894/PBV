(() => {
// DBストレージ.
// ブラウザ内データベースを利用した
// ローカルストレージの代わりをする処理.
(function (_global) {
  "use strict";

  // undefined定義.
  var _u = undefined;

  var _c = function (call, value) {
    if (typeof (call) == "function") call(value);
  }

  // indexedDBが利用可能.
  try {
    _global.indexedDB = _global.indexedDB ||
      _global.mozIndexedDB ||
      _global.webkitIndexedDB ||
      _global.OIndexedDB ||
      _global.msIndexedDB;
  } catch (e) {}
  var idxdbs = null;
  if (_global.indexedDB != _u) {
    idxdbs = function () {
      var _name = 'dbLocalStorage'
      var _version = 100; // 1.00.

      var _table = "DbStorageByLocalTable";
      var _keyColumn = "pkey";
      var _valueColumn = "value";

      var _db = null;

      var o = {};

      // 初期処理.
      var _init = function (c) {
        var object = indexedDB.open(_name, _version);
        object.onupgradeneeded = function (ev) {
          console.log("### [indexedDB] upgradeneeded");
          try {
            var db = object.result;
            db.transaction.onerror = function (err) {
              console.log("error indexedDB(init[onupgradeneeded])", err);
            }
            if (db.objectStoreNames.contains(_table)) {
              db.deleteObjectStore(_table);
            }
            db.createObjectStore(_table, {
              keyPath: "" + _keyColumn,
              autoIncrement: false
            });
          } catch (e) {
            console.log("error init[onupgradeneeded]:" + e);
          }
        }
        object.onsuccess = function (ev) {
          console.log("### [indexedDB] success");
          try {
            _db = (ev["target"] != _u && ev["target"] != null) ?
              ev["target"].result : ev.result;
          } catch (e) {
            _db = null;
            console.log("error init[onsuccess]:" + e);
          }
          if (c != _u) c();
        }
      }

      // テーブル内クリア.
      var _clear = function (tx, call) {
        try {
          var store = tx.objectStore(_table);
          store.clear();
          tx.oncomplete = function () {
            _c(call, true);
          }
          tx.onabort = tx.onerror = function () {
            _c(call, false);
          }
        } catch (e) {
          console.log("error clear:" + e);
          _c(call, false);
        }
      }

      // 行削除.
      var _delete = function (tx, key, call) {
        try {
          var store = tx.objectStore(_table);
          store.delete("" + key);
          tx.oncomplete = function () {
            _c(call, true);
          }
          tx.onabort = tx.onerror = function () {
            _c(call, false);
          }
        } catch (e) {
          console.log("erro delete:" + e);
          _c(call, false);
        }
      }

      // 行追加.
      var _insert = function (tx, key, value, call) {
        try {
          var store = tx.objectStore(_table);
          var v = {};
          v[_keyColumn] = "" + key;
          v[_valueColumn] = "" + value;
          store.put(v);
          tx.oncomplete = function () {
            _c(call, true);
          }
          tx.onabort = tx.onerror = function () {
            _c(call, false);
          }
        } catch (e) {
          console.log("error add:" + e);
          _c(call, false);
        }
      }

      // １行取得.
      var _get = function (tx, key, call) {
        try {
          var store = tx.objectStore(_table);
          var req = store.get("" + key);
          req.onsuccess = function () {
            var v = req.result;
            if (v == _u || v == null) {
              v = "";
            } else if (v.value == _u || v.value == null) {
              v.value = "";
            }
            _c(call, v.value);
          }
          req.onerror = function () {
            _c(call, null);
          }
        } catch (e) {
          console.log("error get:" + e);
          _c(call, null);
        }
      }

      // readWrite transaction.
      var _tran = function () {
        try {
          return _db.transaction(_table, "readwrite");
        } catch (e) {
          console.log("error getTransaction(rw):" + e);
        }
      }

      // readOnly transaction.
      var _rTran = function () {
        try {
          return _db.transaction(_table, "readonly");
        } catch (e) {
          console.log("error getTransaction(r):" + e);
        }
      }

      // 初期処理.
      var _initFlag = false;
      var init = function (c) {
        var n = _initFlag;
        _initFlag = true;
        if (!n) {
          _init(c);
        } else {
          if (c != _u) c();
        }
      }

      // 全データクリア.
      o.clear = function (call) {
        init(function () {
          _clear(_tran(), call);
        });
      }

      // データセット.
      o.add = o.put = function (key, value, call) {
        init(function () {
          _insert(_tran(), key, value, call);
        });
      }

      // データ削除.
      o.remove = function (key, call) {
        init(function () {
          _delete(_tran(), key, call);
        });
      }

      // データ取得.
      o.get = function (key, call) {
        init(function () {
          _get(_rTran(), key, call);
        });
      }

      // 区分.
      o.type = function () {
        init();
        return "indexedDB";
      }

      return o;
    }
  }

  // WebSQLが利用可能な場合.
  var wsqls = null;
  if (_global["openDatabase"] != _u) {
    wsqls = function () {
      var _name = 'dbLocalStorage'
      var _version = '1.0'
      var _description = 'dbLocalStorage'
      var _size = 5 * 1048576;

      var _table = "DbStorageByLocalTable";
      var _keyColumn = "id";
      var _valueColumn = "value";

      // データベース取得.
      var _db = openDatabase(_name, _version, _description, _size);

      var o = {};

      // 基本テーブル作成.
      var _create = function (tx, call) {
        tx.executeSql("create table if not exists " + _table +
          " (" + _keyColumn + " TEXT NOT NULL PRIMARY KEY UNIQUE" +
          " ," + _valueColumn + " TEXT)", [],
          function () {
            _c(call, true);
          },
          function () {
            _c(call, false);
          }
        );
      }

      // テーブル破棄.
      var _drop = function (tx, call) {
        tx.executeSql("drop table " + _table, [],
          function () {
            _c(call, true);
          },
          function () {
            _c(call, false);
          }
        );
      }

      // 行削除.
      var _delete = function (tx, key, call) {
        tx.executeSql("DELETE FROM " + _table + " WHERE " + _keyColumn + "=?", ["" + key],
          function () {
            _c(call, true);
          },
          function () {
            _c(call, false);
          }
        );
      }

      // 行追加.
      var _insert = function (tx, key, value, call) {
        tx.executeSql("INSERT INTO " + _table + " VALUES ( ?, ? )", ["" + key, "" + value],
          function () {
            _c(call, true);
          },
          function () {
            _c(call, false);
          }
        );
      }

      // 初期処理.
      var _initFlag = false;
      var init = function (c) {
        var n = _initFlag;
        _initFlag = true;
        if (!n) {
          // 基本テーブル作成.
          _db.transaction(
            function (tx) {
              _create(tx);
              if (c != _u) c();
            }
          );
        } else {
          if (c != _u) c();
        }
      }

      // 全データクリア.
      o.clear = function (call) {
        init(function () {
          _db.transaction(
            function (tx) {
              _drop(tx, function () {
                _create(tx, call);
              });
            });
        });
      }

      // データセット.
      o.add = o.put = function (key, value, call) {
        init(function () {
          _db.transaction(
            function (tx) {
              _delete(tx, key, function () {
                _insert(tx, key, value, call);
              });
            });
        });
      }

      // データ削除.
      o.remove = function (key, call) {
        init(function () {
          _db.transaction(
            function (tx) {
              _delete(tx, key, call);
            });
        });
      }

      // データ取得.
      o.get = function (key, call) {
        init(function () {
          _db.transaction(
            function (tx) {
              tx.executeSql(
                "SELECT " + _valueColumn + " FROM " +
                _table + " WHERE " + _keyColumn + "=? limit 1", [key],
                function (tx, rs) {
                  var len = rs.rows.length;
                  if (len != 1) {
                    _c(call, null);
                  } else {
                    var row = rs.rows.item(0);
                    _c(call, row[_valueColumn]);
                  }
                }
              );
            });
        });
      }
      // 区分.
      o.type = function () {
        init();
        return "webDB";
      }
      return o;
    }
  }

  var dbStorage = null;

  // indexedDBが利用可能な場合は、それで処理対象とする.
  if (idxdbs != null) {
    dbStorage = idxdbs();

    // WebSQLが利用可能な場合は、それで処理対象とする.
  } else if (wsqls != null) {
    dbStorage = wsqls();

    // 対応Webデータベースが存在しない場合は、メモリで代わりを行う.
  } else {
    dbStorage = (function () {
      var o = {};
      var map = {}
      o.clear = function (call) {
        map = {};
        _c(call, true);
      }
      o.add = o.put = function (key, value, call) {
        map["" + key] = value;
        _c(call, true);
      }
      o.remove = function (key, call) {
        delete map["" + key];
        _c(call, true);
      }
      o.get = function (key, call) {
        var ret = map["" + key];
        _c(call, ret);
      }
      o.type = function () {
        return "memory";
      }
      return o;
    })();
  }

  _global.dbStorage = dbStorage;

})(window);

/* == */

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
    return '  #pbvContainer .flex {display: flex;}#pbvContainer .none {display: none;}#pbvContainer .aBut {display: block;margin: auto 0 auto 5px;padding: 3px 6px;border-radius: 16px;background-color: #eee;color: #666;cursor: pointer;text-align: center;text-decoration: none;}#pbvContainer a {cursor: pointer;}#pbvNav .navContents {margin-top: -1px;padding: 13px 16px 16px;font-weight: 700;font-size: 16px;color: #999;text-decoration: none;border-top: 4px solid transparent;-webkit-transition: color .2s;transition: color .2s;}#pbvNav .navContents:hover {color: #333;}#pbvNav .navContents.active {border-top: 4px solid #0096fa;color: #333;}#pbvMenu {margin: 30px 0;padding: 0;}#pbvContainer .mode label {display: block;margin: auto 5px auto 0;cursor: pointer;}#pbvContainer .mode input[type=radio] {cursor: pointer;}#pbvContainer .mode input[type=text] {-webkit-box-flex: 0;-webkit-flex: none;flex: none;padding: 3px 5px;width: 163px;height: 20px;border: 1px solid #becad7;font-size: 14px;line-height: 1;color: #555;border-radius: 0;outline: 0;-webkit-appearance: none;background-color: #fff;}#searchBut {-webkit-box-flex: 0;-webkit-flex: none;flex: none;width: 50px;height: 28px;background-color: #becad7;background-image: url("https://s.pximg.net/www/js/spa/00545159b33bfc46a2dc0eff7ef34f5b.png");background-position: 50%;background-repeat: no-repeat;background-size: 16px 16px;border: none;cursor: pointer;}#searchBut:hover {background-color: #ced7e1;}#itemList {margin: 0 -12px -24px;padding: 0;display: flex;flex-wrap: wrap;align-content: flex-start;list-style: none;}#itemList li {margin: 0 12px 24px;}#itemList li>div {width: 184px;margin: 0px;}#itemList li>div>div:nth-child(1) {position: relative;margin-bottom: 4px;}#itemList li>div>div:nth-child(1)>div {position: relative;width: 184px;height: 184px;}#itemList li>div>div:nth-child(1)>div>a {text-decoration: none;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1) {position: absolute;top: 0px;left: 0px;right: 0px;box-sizing: border-box;display: flex;z-index: 1;padding: 4px 4px 0px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(1) {display: flex;flex-flow: row wrap;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(1)>div {margin: 2px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(1)>div>div {color: rgb(255, 255, 255);font-weight: bold;font-size: 10px;line-height: 1;padding: 3px 6px;border-radius: 3px;background: rgb(255, 64, 96);}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(2) {display: flex;-webkit-box-align: center;align-items: center;box-sizing: border-box;margin-left: auto;height: 20px;color: rgb(255, 255, 255);font-size: 10px;line-height: 12px;font-weight: bold;flex: 0 0 auto;padding: 4px 6px;background: rgba(0, 0, 0, 0.32);border-radius: 10px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(2)>svg {stroke: none;line-height: 0;font-size: 0px;width: 9px;height: 10px;fill: currentcolor;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(1)>div:nth-child(2)>span {margin-left: 2px;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2) {display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;width: 100%;height: 100%;background-size: cover;background-color: rgb(255, 255, 255);border-radius: 4px;background-position: center center;background-repeat: no-repeat;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)::before {content: "";position: absolute;display: block;top: 0px;left: 0px;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.02);}#itemList li>div>div:nth-child(1)>div>a:hover>div:nth-child(2) {opacity: 0.8;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)>svg {width: 48px;height: 48px;stroke: none;fill: rgb(255, 255, 255);line-height: 0;font-size: 0px;vertical-align: middle;}#itemList li>div>div:nth-child(1)>div>a>div:nth-child(2)>svg circle {fill: rgb(0, 0, 0);fill-opacity: 0.4;}#itemList li>div>a:nth-child(2) {display: inline-block;max-width: 100%;text-overflow: ellipsis;white-space: nowrap;line-height: 22px;font-size: 14px;font-weight: bold;color: rgb(31, 31, 31);overflow: hidden;text-decoration: none;transition: color 0.2s ease 0s;}#itemList li>div>a:nth-child(2):visited {color: rgb(173, 173, 173);}#itemList li>div>a:nth-child(2):hover {color: rgb(92, 92, 92);}#itemList li>div>div:nth-child(3) {display: flex;-webkit-box-align: center;align-items: center;width: 100%;}#itemList li>div>div:nth-child(3)>div {margin-right: 4px;}#itemList li>div>div:nth-child(3)>div>a {position: relative;display: block;width: 16px;height: 16px;border-radius: 50%;background-size: cover;background-position: top;-webkit-box-flex: 0;-webkit-flex: none;flex: none;}#itemList li>div>div:nth-child(3)>div>a:before {position: absolute;display: block;content: "";top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,.02);}#itemList li>div>div:nth-child(3)>a {display: inline-block;line-height: 16px;font-size: 12px;color: rgb(173, 173, 173);text-overflow: ellipsis;white-space: nowrap;text-decoration: none;overflow: hidden;}#iframeBookmark {margin: 16px 0;}#bookmarkReadStrat {padding: 8px 14px;z-index: 5;}#pbvContainer .overlayContainer {position: relative;padding: 10px 0;}#pbvContainer .overlay {position: absolute;left: -1%;width: 102%;height: 100%;z-index: 2;background: rgba(0,0,0,.2);}#dataOption .textareaContainer {width: 100%;height: 320px;}#optionTextarea {width: 100%;height: 100%;}#dataOption .butContainer {margin: 20px 0;padding: 0 0 10px 0;}#dataOption .aBut {margin: auto 5px auto 0;}';
  }
  return '#pbvContainer .flex {display: flex;flex-wrap: wrap;}#pbvContainer .none {display: none;}#pbvContainer .aBut {display: block;margin: auto 0 auto 5px;padding: 3px 6px;border-radius: 16px;background-color: #eee;color: #666;cursor: pointer;text-align: center;text-decoration: none;}#pbvMenu {margin: 30px 0;padding: 0;}#pbvContainer .mode label {margin: auto 5px auto 0;cursor: pointer;}#pbvContainer .mode input {cursor: pointer;}#searchBut {-webkit-box-flex: 0;-webkit-flex: none;flex: none;width: 50px;height: 32px;margin: auto;background-color: #becad7;background-image: url("https://s.pximg.net/www/js/spa/00545159b33bfc46a2dc0eff7ef34f5b.png");background-position: 50%;background-repeat: no-repeat;background-size: 16px 16px;border: none;cursor: pointer;}#itemList>div {width: 50%;display: inline-block;position: relative;}#itemList>div>div {display: inline-block;box-sizing: border-box;position: relative;width: 100%;vertical-align: bottom;}#itemList>div>div>a>div {width: 100%;height: 100%;position: relative;background: #fff;overflow: hidden;}#itemList>div>div>a>div>div.square {display: block;height: 0;width: 100%;padding-bottom: 100%;opacity: 0;}#itemList>div>div>a>div>div.image {position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-size: cover;}#itemList>div>div>a>div>div.image>div.count {position: absolute;top: 4px;right: 4px;display: inline-block;margin: 0;padding: 0 6px;line-height: 19px;color: #fff;background: rgba(0,0,0,.4);border-radius: 20px;font-size: 10px;font-weight: 700;}#itemList>div>div>a>div>div.image>div.count>img {vertical-align: middle;height: 9px;margin-right: 3px;}#itemList>div>div>a>div>div.image>div.r18 {position: absolute;top: 2px;left: 4px;display: inline-block;}#itemList>div>div>a>div>div.image>div.r18>span {display: inline-block;font-size: 10px;line-height: 10px;font-weight: 700;padding: 3px 6px;border-radius: 3px;color: rgb(255, 255, 255);background: rgb(255, 64, 96);}#itemList>div>div>a>div>div.image>div.ugoku {position: absolute;top: 50%;left: 50%;-webkit-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);}#itemList>div>div>a>div>div.image>div.ugoku>img {position: absolute;top: 50%;left: 50%;height: 45%;-webkit-transform: translateX(-37.5%) translateY(-50%);transform: translateX(-37.5%) translateY(-50%);}#bookmarkAdd .aBut {margin: 5px;flex-grow: 1;}#bookmarkAdd label {margin: auto;}#bookmarkAdd .iframeContainer {width: 100%;height: 320px;margin: 16px 0;overflow: scroll;}#pbvContainer .overlayContainer {position: relative;padding: 10px 0;}#pbvContainer .overlay {position: absolute;left: -1%;width: 102%;height: 100%;z-index: 2;background: rgba(0,0,0,.2);}#bookmarkReadStrat {padding: 8px 14px;z-index: 5;}#dataOption .textareaContainer {width: 100%;height: 320px;}#optionTextarea {width: 100%;height: 100%;}#dataOption .butContainer {margin: 20px 0;padding: 0 0 10px 0;}#dataOption .aBut {margin: 8px;}';
})();
var pbvNav = (() => {
  return '<a href="javascript:void(0);" id="navBookmark" class="navContents active">ブックマーク</a><a href="javascript:void(0);" id="navOption" class="navContents">オプション</a>';
})();
var pbvBookmarkHTML = (() => {
  if (pc) {
    return '<menu id="pbvMenu" class="flex"><div class="mode flex"><label><span>登録順</span><input type="radio" id="radioNormal" name="radioMode" checked></label><label><span>ランダム</span><input type="radio" id="radioRandom" name="radioMode"></label></div><input type="search" id="inputSearch" value="" placeholder="検索" style="flex-grow:1;"><div class="buttons flex"><a href="javascript:void(0);" id="searchBut"></a></div></menu><ul id="itemList"></ul>';
  }
  return '<menu id="pbvMenu"><div class="flex" style="flex-wrap:nowrap;"><input type="search" id="inputSearch" value="" placeholder="検索" style="flex-grow:1;"><a href="javascript:void(0);" id="searchBut"></a></div><div class="mode flex"><label><span>登録順</span><input type="radio" id="radioNormal" name="radioMode" checked></label><label><span>ランダム</span><input type="radio" id="radioRandom" name="radioMode"></label></div></menu><span id="itemList"></span>';
})();
var pbvOptionHTML = (() => {
  if (pc) {
    return '<div id="bookmarkAdd" class="overlayContainer"><div class="overlay none"></div><h2>ブックマークの読み込み</h2><div><div class="flex"><label><span>ページ数</span><input type="number" id="inputPageCount" value="1" min="1" max="9999"></label><a href="javascript:void(0);" id="jumpPageCount" class="aBut">移動</a><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="jumpOldPage" class="aBut">旧ブックマークページ</a><a href="javascript:void(0);" id="jumpNewPage" class="aBut">新ブックマークページ</a></div><iframe id="iframeBookmark" src="" width="100%" height="320px"></iframe></div><div class="mode flex"><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="bookmarkReadStrat" class="aBut" style="padding: 8px 14px;">開始</a></div></div><div id="dataOption"><h2>データの管理</h2><div class="textareaContainer"><textarea id="optionTextarea"></textarea></div><div class="butContainer flex"><a href="javascript:void(0);" id="butDataShow" class="aBut">データの表示</a><a href="javascript:void(0);" id="butDataSave" class="aBut">データの保存</a><a href="javascript:void(0);" id="butLoadWithAjax" class="aBut">データの読み込み</a><a href="javascript:void(0);" id="butGetDataWithApi" class="aBut">データの取得</a></div></div>';
  }
  return '<div id="bookmarkAdd" class="overlayContainer"><div class="overlay none"></div><h2>ブックマークの読み込み</h2><div class="flex"><a href="javascript:void(0);" id="jumpOldPage" class="aBut">旧ブックマークページ</a><a href="javascript:void(0);" id="jumpNewPage" class="aBut">新ブックマークページ</a></div><div class="flex"><label><span>ページ数</span><input type="number" id="inputPageCount" value="1" min="1" max="9999"></label><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="jumpPageCount" class="aBut">移動</a></div><div class="iframeContainer"><iframe id="iframeBookmark" src="" width="100%" height="320px"></iframe></div><div class="mode flex"><div style="flex-grow: 1;"></div><a href="javascript:void(0);" id="bookmarkReadStrat" class="aBut" style="padding: 8px 14px;">開始</a><div style="flex-grow: 1;"></div></div></div><div id="dataOption"><h2>データの管理</h2><div class="textareaContainer"><textarea id="optionTextarea"></textarea></div><div class="butContainer flex"><a href="javascript:void(0);" id="butDataShow" class="aBut">データの表示</a><a href="javascript:void(0);" id="butDataSave" class="aBut">データの保存</a><a href="javascript:void(0);" id="butLoadWithAjax" class="aBut">データの読み込み</a><a href="javascript:void(0);" id="butGetDataWithApi" class="aBut">データの取得</a></div></div>';
})();

var page = 'bookmark';

var bookmarkData = [];
var randomData = [];
var searchData = [];

var userData = {};

var addData = [];

var bookmarkViewMode = 'normal';
var loadCount = 0; // 何回目の読み込みか
var viewCount = 18; // 一回のロードで何枚読み込むか
var illustLoadMargin = 0; // 読み込む範囲

var bookmarkAddPage = '';
var bookmarkAddPageCount = 1;
var reading = false;

var container;

// scroll
window.onscroll = () => {
  if (page == 'bookmark') {
    appendItemToBottom();
  }
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
    container = document.querySelector('#contents>div>div:nth-child(2)>div:nth-child(5)');
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

function changePage() {
  if (page == 'bookmark') {
    container.innerHTML = pbvBookmarkHTML;

    bookmarkViewMode = 'normal';
    loadCount = 0;
    addItem();
  }
  else {
    container.innerHTML = pbvOptionHTML;

    bookmarkPage = '';
    bookmarkAddPage = '';
    bookmarkAddPageCount = 1;
    reading = false;
    document.getElementById("optionTextarea").placeholder =
    "「データの表示」　ここに現在のデータを表示します。\r\n\r\n" +
    "「データの保存」　データをストレージに保存します。また、ここに書かれたデータを現在のデータに上書き保存します。\r\n\r\n" +
    "「データの読み込み」　ここに書かれたURLのファイル内容を上書き保存します。（dropboxの共有URLでも可）\r\n\r\n" +
    "「データの取得」　APIを用いてデータを取得します。取得後、上書き または 情報の更新ができます。 ※ストレージに保存はしません。\r\n\r\n";
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
      createSearchData()
      .then(addItem());
    }, false);
    // radioRandom
    element = document.getElementById('radioRandom');
    element.addEventListener('click', () => {
      bookmarkViewMode = 'random';
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      createRandomData()
      .then(createSearchData())
      .then(addItem());
    }, false);

    // inputSearch
    element = document.getElementById('inputSearch');
    element.addEventListener('change', () => {
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      createSearchData()
      .then(addItem());
    }, false);

    // searchBut
    element = document.getElementById('searchBut');
    element.addEventListener('click', () => {
      loadCount = 0;
      document.getElementById('itemList').innerHTML = null;
      createSearchData()
      .then(addItem());
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
    // inputPageCount keydown
    element = document.getElementById('inputPageCount');
    element.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) bookmarkAddPageChange();
    }, false);
    // jumpOldPage
    element = document.getElementById('jumpOldPage');
    element.addEventListener('click', () => {
      bookmarkAddPage = 'old';
      document.getElementById('inputPageCount').value = 1;
      bookmarkAddPageChange();
    }, false);
    // jumpNewPage
    element = document.getElementById('jumpNewPage');
    element.addEventListener('click', () => {
      bookmarkAddPage = 'new';
      document.getElementById('inputPageCount').value = 1;
      bookmarkAddPageChange();
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
    // butDataSave
    element = document.getElementById('butDataSave');
    element.addEventListener('click', () => {
      overwriteBookmarkData();
    }, false);
    // butLoadWithAjax
    element = document.getElementById('butLoadWithAjax');
    element.addEventListener('click', () => {
      loadDataWithAjax();
    }, false);
    // butGetDataWithApi
    element = document.getElementById('butGetDataWithApi');
    element.addEventListener('click', () => {
      getDataWithApi();
    }, false);
  }
};

function loadToLocalStorage() {
  return new Promise(function(resolve, reject) {
    dbStorage.get('pbv', (d) => {
      var data = JSON.parse(d);
      if (!isObject(data)) data = {};
      bookmarkData = (() => {
        if (data.bookmark) return data.bookmark;
        return [];
      })();
      userData = (() => {
        if (data.user) return data.user;
        return {};
      })();
      resolve();
    });
  });
}

function saveToLocalStorage(dataStr) {
  return new Promise(function(resolve) {
    if (dataStr) {
      dbStorage.add('pbv', dataStr, resolve);
    }
    else {
      var data = {
        "bookmark": bookmarkData,
        "user": userData
      };
      dbStorage.add('pbv', JSON.stringify(data), resolve);
    }
  });
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

function getData(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          resolve(xhr.responseText);
        }
        else {
          reject(Error(xhr.statusText));
        }
      }
    };
    xhr.onerror = function() {
      reject(Error("Network Error"));
    };
    xhr.open('GET', url);
    xhr.send(null);
  });
}

function isObject(o) {
  return (o instanceof Object && !(o instanceof Array)) ? true : false;
};

function formatTime(date, format) {
  format = format.replace(/YYYY/, date.getFullYear());
  format = format.replace(/MM/, zeroPadding(date.getMonth() + 1, 2));
  format = format.replace(/DD/, zeroPadding(date.getDate(), 2));
  format = format.replace(/hh/, zeroPadding(date.getHours(), 2));
  format = format.replace(/mm/, zeroPadding(date.getMinutes(), 2));
  format = format.replace(/ss/, zeroPadding(date.getSeconds(), 2));
  return format;
}

function zeroPadding(str, count) {
  var herd = new Array(count + 1).join('0');
  return (herd + str).slice(0 - count);
}

resetHTML();
setEvent();
loadToLocalStorage()
.then(() => {
  try {
    document.getElementById('radioNormal').click();
  } catch (e) {}
});

/* bookmark */

function addItem() {
  try {
    for (var i = 0; i < viewCount; i++) {
      var index = i + (loadCount * viewCount);
      var data = (() => {
        if (bookmarkViewMode == 'normal') return bookmarkData[index];
        if (bookmarkViewMode == 'random') return randomData[index];
        return searchData[index];
      })();
      createItem(data);
    }
  }
  catch (e) {
    console.error(e);
  }
};

function createItem(data) {
  if (data == undefined) return;

  var isCount = (() => {
    if (data.count == '1') return 'display: none;';
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
  var isUgoku02 = (() => {
    if (data.ugoku) return '';
    return '_p0';
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
      '        <div data-tags="' + (data.tags.join(' ')) + '" style="background-image: url(https://i.pximg.net/c/250x250_80_a2/img-master/img/' + data.img + '/' + data.id + isUgoku02 + '_square1200.jpg);">' +
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
      '      <a href="https://www.pixiv.net/member.php?id=' + data.userId + '" target="_blank" style="background-image: url(' + userData[data.userId].icon + ');"></a>' +
      '    </div>' +
      '    <a href="https://www.pixiv.net/member.php?id=' + data.userId + '" target="_blank">' + userData[data.userId].name + '</a>' +
      '  </div>' +
      '</div>';
    }
    return '<div>' +
    '  <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + data.id + '" target="_blank">' +
    '    <div>' +
    '      <div class="square"></div>' +
    '      <div class="image" data-tags="' + (data.tags.join(' ')) + '" style="background-image: url(https://i.pximg.net/c/540x540_70/img-master/img/' + data.img + '/' + data.id + isUgoku02 + '_square1200.jpg);">' +
    '        <div class="r18" style="' + isR18 + '">' +
    '          <span>R-18</span>' +
    '        </div>' +
    '        <div class="count" style="' + isCount + '">' +
    '          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9">' +
    '            <path fill="#fff" d="M8 2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1h4a2 2 0 002-2V2zM1 0h5a1 1 0 011 1v5a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1z" fill-rule="evenodd"/>' +
    '          </svg>' +
    '          <span>' + data.count + '</span>' +
    '        </div>' +
    '        <div class="ugoku" style="' + isUgoku + '">' +
    '          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">' +
    '            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="rgba(0, 0, 0, 0.32)"></path>' +
    '            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.507 7.88647C9.84039 7.49433 9 7.97499 9 8.7484L9 15.2516C9 16.025 9.84039 16.5056 10.507 16.1135L16.0347 12.8619C16.692 12.4753 16.692 11.5247 16.0347 11.1381L10.507 7.88647Z" fill="#fff"></path>' +
    '          </svg>' +
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
    if(remain <= 200) {
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

function createSearchData() {
  return new Promise(function(resolve, reject) {
    // 検索用の配列を空にしておく
    searchData = [];
    // 検索欄内の文字列
    var searchBox = document.getElementById('inputSearch').value;
    // 空文字の場合は帰す
    if (searchBox == '') {
      bookmarkViewMode = (() => {
        if (document.getElementById('radioRandom').checked) return 'random';
        return 'normal';
      })();
      resolve();
      return;
    }

    // 使う配列
    var arr = [];
    if (document.getElementById('radioRandom').checked) { arr = randomData; }
    else { arr = bookmarkData; }

    var searchTexts = searchBox.replace(/\s/g , ' ').split(' ');

    var matcher;
    if (!/^\/.*\/$/.test(searchBox)) {
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
      matcher = compile(condition);
    }
    else {
      matcher = new RegExp(searchBox.slice(1, -1));
    }

    for (var i = 0; i < arr.length; i++) {
      var testStr = arr[i]['title'] + ' ' + arr[i]['user'] + ' ' + arr[i]['tags'].join(' ');

      if (matcher.test(testStr)) {
        searchData.push(arr[i]);
      }
    }

    bookmarkViewMode = 'search';
    resolve();
  });
}

addItem();
createRandomData();

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

  var lastFlag = false;

  if (bookmarkAddPage == 'old') {
    var imgItem = iframeDoc.querySelectorAll('.js-legacy-mark-unmark-list .image-item');
    if (imgItem.length == 0) lastFlag = true;
    for (var i = 0; imgItem[i]; i++) {
      try {
        var imgElement = imgItem[i].getElementsByClassName('ui-scroll-view')[0];
        var data = {};
        data.id = +imgElement.getAttribute('data-id');
        data.title = imgItem[i].getElementsByClassName('title')[0].getAttribute('title');
        data.userId = +imgItem[i].getElementsByClassName('user')[0].getAttribute('data-user_id');
        data.count = (() => {
          if (imgItem[i].querySelector('.page-count span')) return +imgItem[i].querySelector('.page-count span').textContent;
          return 1;
        })();
        data.img = imgElement.getAttribute('data-src').match(/\d{4}\/\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}/)[0];
        data.ugoku = (() => {
          if (imgItem[i].getElementsByClassName('work')[0].classList.contains('ugoku-illust')) return 1;
          return 0;
        })();
        data.tags = imgElement.getAttribute('data-tags').split(' ');
        addData.push(data);

        if (userData[data.userId] == null) {
          userData[data.userId] = {
            "name": imgItem[i].getElementsByClassName('user')[0].getAttribute('data-user_name'),
            "icon": ""
          };
        }
        else {
          userData[data.userId].name = imgItem[i].getElementsByClassName('user')[0].getAttribute('data-user_name');
        }
      }
      catch (e) {
        console.error(e);
      }
    }
  }
  else {
    var imgItem = iframeDoc.querySelectorAll('div[role]');
    for (var i = 1; imgItem[i]; i++) {
      try {
        var a = imgItem[i].parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('a');
        var id = a[2].href.match(/(\w+)$/)[1];
        userData[id] = {
          "name": a[3].textContent,
          "icon": a[2].querySelector('img').src
        };
      }
      catch (e) {
        console.error(e);
      }
    }
    p++;
    var url = (() => {
      if (bookmarkAddPage == 'old') return 'https://www.pixiv.net/bookmark.php?rest=show&p=' + p;
      if (bookmarkAddPage == 'new') return 'https://www.pixiv.net/bookmark.php?id=9791957&rest=show&p=' + p;
      return '';
    })();
    iframe.src = url;
  }

  if (checkConnectData() || lastFlag || bookmarkAddPage != 'old') {
    new Promise(resolve => {
      if (bookmarkAddPage == 'old') {
        if (!lastFlag) {
          addBookmarkData();
        }
        else {
          bookmarkData = addData;
        }
      }
      resolve();
    })
    .then(saveToLocalStorage())
    .then(() => {
      document.getElementById('bookmarkReadStrat').click();
    });
  }
  else {
    p++;
    var url = (() => {
      if (bookmarkAddPage == 'old') return 'https://www.pixiv.net/bookmark.php?rest=show&p=' + p;
      if (bookmarkAddPage == 'new') return 'https://www.pixiv.net/bookmark.php?id=9791957&rest=show&p=' + p;
      return '';
    })();
    iframe.src = url;
  }
}

function checkConnectData() {
  if (bookmarkData.length < 1) return false;

  var result = addData.some(value => {
    return value.id === bookmarkData[0].id;
  });
  return result;
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

function showBookmarkData() {
  var confirm = window.confirm('データを表示します。');
  if (!confirm) return;

  var data = {
    "bookmark": bookmarkData,
    "user": userData
  };
  data = JSON.stringify(data);

  var optionTextarea = document.getElementById('optionTextarea');
  optionTextarea.value = data;
}

function overwriteBookmarkData() {
  var confirm = window.confirm('データを上書きします。');
  if (!confirm) return;

  var optionTextarea = document.getElementById('optionTextarea');

  new Promise(function(resolve, reject) {
    var data = optionTextarea.value;
    saveToLocalStorage(data);
    resolve();
  })
  .then(loadToLocalStorage())
  .then(() => {
    optionTextarea.value = '完了';
  })
  .catch(err => {
    optionTextarea.value = 'データが無効です。';
    console.error(e);
  });
}

function loadDataWithAjax() {
  var confirm = window.confirm('データを読み込みます。');
  if (!confirm) return;

  var optionTextarea = document.getElementById('optionTextarea');
  var url = optionTextarea.value.replace(/(\r|\n|\r\n)/g, '');
  if (optionTextarea.value == '') {
    optionTextarea.value = 'URLが無効です。';
    return;
  }

  if (/https\:\/\/www\.dropbox\.com\/s\/.+?\?dl=0/.test(url)) {
    url = url.replace(/^(.+?)www\.dropbox\.com(.+?)\?dl=0$/, '$1dl.dropboxusercontent.com$2');
  }

  getData(url)
  .then(res => {
    new Promise(function(resolve, reject) {
      saveToLocalStorage(res);
      resolve();
    })
    .then(loadToLocalStorage())
    .then(() => {
      optionTextarea.value = '完了';
    })
    .catch(err => {
      optionTextarea.value = 'データが無効です。';
      console.error(err);
    });
  },
  err => {
    optionTextarea.value = 'URLが無効です。';
    console.error(err);
  })
}

function getDataWithApi() {
  var confirm = window.confirm('データを取得しますか。');
  if (!confirm) return;

  var myId = location.search.match(/id=(\w+)/)[1];
  getData('https://www.pixiv.net/ajax/user/' + myId + '/illusts/bookmarks?tag=&offset=0&limit=1&rest=show')
  .then(res => {
    return new Promise(resolve => {
      var data = JSON.parse(res);
      var total = data.body.total;
      var option = {
        "myId": myId,
        "total": total
      };

      resolve(option);
    });
  })
  .then(loopGetData)
  .then(res => {
    convertData(res)
    .then(data => {
      if (window.confirm('データを上書きしますか。')) {
        bookmarkData = (() => {
          if (data.bookmark) return data.bookmark;
          return [];
        })();
        userData = (() => {
          if (data.user) return data.user;
          return {};
        })();
      }
      else if (window.confirm('データを更新しますか。')) {
        data.bookmark.forEach(e => {
          try {
            var target = bookmarkData.find(targetData => {
                return (targetData.id == e.id);
            });

            target.id = +e.id;
            target.title = e.title;
            target.userId = +e.userId;
            target.count = +e.count;
            target.img = e.img;
            target.ugoku = e.ugoku;
            target.tags = e.tags;
          } catch (e) { }
        });

        userData = (() => {
          if (data.user) return data.user;
          return {};
        })();
      }
      try {
        document.getElementById('radioNormal').click();
      } catch (e) {}
      alert('完了');
    });
  })
}
// if (!pc) getDataWithApi();

function loopGetData(option) {
  return new Promise(function(resolve_0, reject_0) {
    var optionTextarea = document.getElementById('optionTextarea');
    optionTextarea.value = 'ループ開始';

    var index = 0;
    var maxCount = Math.ceil(option.total / 100);

    var allData = [];

    var loop = () => {
      return new Promise(function(resolve_1, reject_1) {
        optionTextarea.value = (index + 1) + '/' + maxCount;

        var offset = 100 * index;
        var url = 'https://www.pixiv.net/ajax/user/' + option.myId + '/illusts/bookmarks?tag=&offset=' + offset + '&limit=100&rest=show';
        resolve_1(url);
      })
      .then(getData)
      .then(res => {
        var data = JSON.parse(res);
        var works = data.body.works;
        allData = allData.concat(works);
        index++;

        if (index < maxCount) {
          loop();
        }
        else {
          optionTextarea.value = '';
          resolve_0(allData);
        }
      });
    };
    loop();
  });
}

function convertData(bookmarkData) {
  return new Promise(function(resolve, reject) {
    var pbvData = {"bookmark":[],"user":{}};
    bookmarkData.forEach(d => {
      var addBookmarkData = {};
      addBookmarkData.id = +d.id;
      addBookmarkData.title = d.title;
      addBookmarkData.userId = +d.userId;
      addBookmarkData.count = +d.pageCount;
      addBookmarkData.img = d.url.match(/\d{4}\/\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}/)[0];
      addBookmarkData.ugoku = (() => {
        if (d.illustType == 2) return 1;
        return 0;
      })();
      addBookmarkData.tags = d.tags;
      pbvData.bookmark.push(addBookmarkData);
      pbvData.user[d.userId] = {
        "name": d.userName,
        "icon": d.profileImageUrl
      };
    });
    resolve(pbvData);
  });
}

})();
