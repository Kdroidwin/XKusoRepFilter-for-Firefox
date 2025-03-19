document.addEventListener("DOMContentLoaded", function () {
    var t = document.getElementById("blockWords"),
        e = document.getElementById("showConfirmDialog"),
        s = document.getElementById("saveButton"),
        n = document.getElementById("status");
  
    // フェードインアニメーション
    document.querySelectorAll(".form-group").forEach(function (t, e) {
      t.style.opacity = "0";
      t.style.transform = "translateY(10px)";
      setTimeout(function () {
        t.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        t.style.opacity = "1";
        t.style.transform = "translateY(0)";
      }, 100 * (e + 1));
    });
  
    // `chrome.storage.sync` を `browser.storage.sync` に対応
    const storage = chrome?.storage || browser.storage;
  
    storage.sync.get(["blockWords", "showConfirmDialog"]).then((s) => {
      var n = s.blockWords || "しばらく観察していると\n紹介したこのブロガー\n彼の指導のもと";
      t.value = n;
      var o = s.showConfirmDialog === undefined || s.showConfirmDialog;
      e.checked = o;
  
      // フォーカス時のエフェクト
      t.addEventListener("focus", function () {
        this.parentElement.style.transform = "scale(1.01)";
      });
      t.addEventListener("blur", function () {
        this.parentElement.style.transform = "scale(1)";
      });
    });
  
    // 保存ボタンの処理
    s.addEventListener("click", function () {
      this.classList.add("clicked");
      var o = this.textContent;
      this.textContent = "保存中...";
      var a = t.value,
          r = e.checked;
  
      storage.sync.set({ blockWords: a, showConfirmDialog: r }).then(() => {
        n.style.display = "block";
        n.style.opacity = "0";
        n.style.transform = "translateY(10px)";
        setTimeout(function () {
          n.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          n.style.opacity = "1";
          n.style.transform = "translateY(0)";
        }, 10);
  
        s.textContent = "保存完了！";
        setTimeout(function () {
          s.textContent = o;
          s.classList.remove("clicked");
          n.style.opacity = "0";
          n.style.transform = "translateY(10px)";
          setTimeout(function () {
            n.style.display = "none";
          }, 300);
        }, 2000);
      });
    });
  
    // バージョン情報を表示
    const runtime = chrome?.runtime || browser.runtime;
    var o = runtime.getManifest(),
        a = document.getElementById("version");
  
    if (a && o.version) {
      a.textContent = "XKusoRepFilter v" + o.version;
      a.style.opacity = "0";
      a.style.transform = "translateY(5px)";
      setTimeout(function () {
        a.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        a.style.opacity = "1";
        a.style.transform = "translateY(0)";
      }, 500);
  
      // クリック時のエフェクト
      a.addEventListener("click", function () {
        var t = this;
        this.style.transform = "scale(1.1)";
        setTimeout(function () {
          t.style.transform = "scale(1)";
        }, 300);
      });
    }
  });
  
