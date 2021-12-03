recentUrls = [];
var btn_show, btn_open

document.addEventListener('DOMContentLoaded', () => {
  listToshow = [];
  var btn_show = document.getElementById("show");
  var btn_open = document.getElementById("open");
  
  try{
  getRecentHistory((tabsHistory) => {

    tabsHistory.forEach(function (session) {
      if (session.window) {
        session.window.tabs.forEach(function (tab) {
          recentUrls.push(tab);
        });
      } else {
        recentUrls.push(session.tab);
      }
    });
    if(recentUrls.length === 0){
      document.getElementById("modal-oops").setAttribute('style', 'display:block');return;
    }
    else{
        document.getElementById("tab-title").setAttribute('style', 'display:block');
    }
    createList("container", 0, 20);
    btn_show.classList.remove("button-disable");
    btn_open.classList.remove("button-disable");
    
  });
  
}catch(e){
  document.getElementById("modal-oops").setAttribute('style', 'display:block');
}

  btn_show.addEventListener("click", function () {
    if (listToshow.length === recentUrls.length) { btn_show.classList.add("button-disable"); return false; };
    createList("container", listToshow.length, recentUrls.length);
    document.getElementById("container").setAttribute('style', 'overflow-y:auto;height:auto');
    document.getElementById("tab-title").setAttribute('style', 'display:block');
   });

  btn_open.addEventListener("click", function () {
    try{
    listToshow.forEach(function (tab) {
      chrome.tabs.create({
        url: tab.url
      });
    });
  }catch(e){
    document.getElementById("modal-oops").setAttribute('style', 'display:block');
}
});

});

function getRecentHistory(callback) {

  chrome.sessions.getRecentlyClosed((items) => {
    callback(items);
  });
}

function createList(container, stVal, endVal) {
  var k = stVal;
  var frag = document.createDocumentFragment();
  for (; k < endVal; k++) {
    var tab = recentUrls[k];
    listToshow.push(tab);
    var li = document.createElement("li");
    var aTag = document.createElement('a');
    aTag.setAttribute('href', tab.url);
    var para = document.createElement("span");
    para.innerHTML = tab.title;
    aTag.appendChild(para);
    li.appendChild(aTag);
    frag.appendChild(li);

  }

  document.getElementById(container).appendChild(frag);
  document.getElementById("tab-title").setAttribute('style', 'display:block');

}
