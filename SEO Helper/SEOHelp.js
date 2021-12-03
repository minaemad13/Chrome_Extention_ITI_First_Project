
window.onload = function() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
          function(activeTabs) {
              chrome.tabs.executeScript(activeTabs[0].id,{file: 'meta.js'});
          }
    );
  });
};

chrome.runtime.onMessage.addListener(
  function(pageObject){

  // URL variables
  var url = pageObject.pageURL;

  //title variables
  var title = pageObject.titleTag;

  //metalist variables
  var listOfMetaObjects = pageObject.metalist;
  var lengthOfMetaList = listOfMetaObjects.length;
  var foundKeywords = false;
  var foundDescription = false;

  var listOfH1Objects = pageObject.h1List;
  var listOfH2Objects = pageObject.h2List;
  var listOfH3Objects = pageObject.h3List;
  var listOfH4Objects = pageObject.h4List;
  var listOfH5Objects = pageObject.h5List;
  var listOfH6Objects = pageObject.h6List;

  var lengthOfH1List = listOfH1Objects.length;
  var lengthOfH2List = listOfH2Objects.length;
  var lengthOfH3List = listOfH3Objects.length;
  var lengthOfH4List = listOfH4Objects.length;
  var lengthOfH5List = listOfH5Objects.length;
  var lengthOfH6List = listOfH6Objects.length;

  
  //URL
  document.getElementById("url").textContent = url;

  //title
  document.getElementById("title").textContent = title;
  document.getElementById("char").textContent = title.length + " characters";

  //metatags
  if(lengthOfMetaList > 0){
    for (var i = listOfMetaObjects.length - 1; i >= 0; i--) {
        node = document.createElement("LI"); //<li></li> 
        text = document.createElement("P");  //<p></p>

        tagName = document.createTextNode(listOfMetaObjects[i][0] + ": ");
        tagContent = document.createTextNode(listOfMetaObjects[i][1]);
              // [[discription, cgdhcs] , [keyword,h,e,f,cusdj]]
        text.appendChild(tagName);    //<p>discriptin:cgdhcs</p>
        text.appendChild(tagContent);
        node.appendChild(text);       //<li><p>discriptin:cgdhcs</p></li>

        document.getElementById("status").appendChild(node); 

        if(listOfMetaObjects[i][0].toLowerCase() == "keywords"){
          foundKeywords = true;

          //count words in keywards
          wordCount = listOfMetaObjects[i][1].toString().split(",").length;
          keyLength = document.createElement("P"); 
          keyLength.innerText = wordCount + " words";
          node.appendChild(keyLength);  //<li><p> 55 word</p></li>
        }
        //********************************************************* */
        if(listOfMetaObjects[i][0].toLowerCase() == "description"){
          foundDescription  = true;

          //count characters in description
          wordCount = listOfMetaObjects[i][1].toString().length;
          descLength = document.createElement("P");
          descLength.innerText = wordCount + " characters";
          node.appendChild(descLength);
          
        }
    };

  } 
  
  if(foundKeywords == false){
    node = document.createElement("LI");
    var warningKeywords = document.createTextNode("Keywords are missing!");
    node.style.color = "red";
    node.appendChild(warningKeywords);
    document.getElementById("status").appendChild(node);  
  } 

   if(foundDescription == false){
    node = document.createElement("LI");
    var warningDescription= document.createTextNode("Description is missing!");
     node.style.color = "red";
    node.appendChild(warningDescription);
    document.getElementById("status").appendChild(node);  
  } 

  //show headers in order
  //h1list
  document.getElementById("h1Length").innerHTML = lengthOfH1List;

  if(lengthOfH1List > 0){
    for (var i = lengthOfH1List - 1; i >= 0; i--) {
        node = document.createElement("LI");
        text = document.createTextNode(listOfH1Objects[i]); 
        node.appendChild(text);
        document.getElementById("headers-h1").appendChild(node);  
    };
  }
  
  else{
    document.getElementById("headers-h1").innerHTML ="<p style='color:red'>No h1 headers!</p> ";
  }
  
  //h2List 
  document.getElementById("h2Length").innerHTML = lengthOfH2List;

  if(lengthOfH2List > 0){
    for (var i = lengthOfH2List  - 1; i >= 0; i--) {
        node = document.createElement("LI");
        text = document.createTextNode(listOfH2Objects[i]);
        node.appendChild(text);
        document.getElementById("headers-h2").appendChild(node);  
    };

  }
  else{
    document.getElementById("headers-h2").innerHTML = "<p style='color:red'>No h2 headers!</p> ";
  }

  //h3List
  document.getElementById("h3Length").innerHTML = lengthOfH3List;

  if(lengthOfH3List > 0){
    for (var i = lengthOfH3List - 1; i >= 0; i--) {
        node = document.createElement("LI");
        text = document.createTextNode(  listOfH3Objects[i]);
        node.appendChild(text);
        document.getElementById("headers-h3").appendChild(node);  
    };

  }
  else{
    document.getElementById("headers-h3").innerHTML = "<p style='color:red'>No h3 headers!</p> ";
  }

  //h4List
  document.getElementById("h4Length").innerHTML = lengthOfH4List;

  if(lengthOfH4List > 0){
    for (var i = lengthOfH4List - 1; i >= 0; i--) {
        node = document.createElement("LI");
        text = document.createTextNode( listOfH4Objects[i]);
        node.appendChild(text);
        document.getElementById("headers-h4").appendChild(node);  
    };

  }
  else{
    document.getElementById("headers-h4").innerHTML = "<p style='color:red'>No h4 headers!</p> ";
  }

  //h5List
  document.getElementById("h5Length").innerHTML = lengthOfH5List;

  if(lengthOfH5List > 0){
    for (var i = lengthOfH5List - 1; i >= 0; i--) {
        node = document.createElement("LI");
        text = document.createTextNode( listOfH5Objects[i]);
        node.appendChild(text);
        document.getElementById("headers-h5").appendChild(node);  
    };

  }
  else{
    document.getElementById("headers-h5").innerHTML = "<p style='color:red'>No h5 headers!</p> ";
  }

  //h6List 
  document.getElementById("h6Length").innerHTML = lengthOfH6List;

  if(lengthOfH6List > 0){
    for (var i = lengthOfH6List - 1; i >= 0; i--) {
        node = document.createElement("LI");
        text = document.createTextNode( listOfH6Objects[i]);
        node.appendChild(text);
        document.getElementById("headers-h6").appendChild(node);  
    };

  }
  else{
    document.getElementById("headers-h6").innerHTML = "<p style='color:red'>No h6 headers!</p> ";
  }
});

