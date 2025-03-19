browser.runtime.onInstalled.addListener(function () {
    browser.storage.sync.get(["blockWords", "showConfirmDialog"]).then((o) => {
      let e = {};
      if (!o.blockWords) {
        e.blockWords = "しばらく観察していると";
      }
      if (o.showConfirmDialog === undefined) {
        e.showConfirmDialog = true;
      }
      if (Object.keys(e).length > 0) {
        browser.storage.sync.set(e);
      }
    });
  });
  
