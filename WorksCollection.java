document.addEventListener('DOMContentLoaded',init());

function init() {
  //alert(document.querySelectorAll('template').length);
  /*var temps = document.getElementsByTagName("template");
  var wblock = temps.item(0).content.querySelector("div");

  var wnode = document.importNode(wblock,true);
  alert(wnode.querySelectorAll('template').length);*/
  for (var i = 18; i >= 0; i--){
    loadJSON(
      function(response)
      {
        var wd = JSON.parse(response);
        loadContent(wd);
      },'workdata/preview'+i.toString()+'.json'
    );
  }
}

function loadJSON(callback, path){
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET',path,true);
  xobj.onreadystatechange = function()
  {
    if (xobj.readyState == 4 && xobj.status == "200")
    {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
function loadContent(work){
  var wblock = document.getElementsByTagName("template").item(0).content.querySelector("div");

  var wnode = document.importNode(wblock,true);
  var temps = wnode.querySelectorAll('template');

  var wbutt = wnode.querySelector(".accordion");

  //ADD BUTTON EVENT LISTENER//
  wbutt.addEventListener("click", function()
    {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight)
      {panel.style.maxHeight = null;}
      else
      {panel.style.maxHeight = panel.scrollHeight + "px";}
    }
  );

  //THUMBNAIL//
  wbutt.setAttribute("id",work.buttonid);
  wbutt.querySelector(".w_title").textContent = work.title;
  wbutt.querySelector(".w_date").textContent = work.date;
  //VIDEO AND DESCRIPTION//
  wnode.querySelector(".w_gitem1").firstElementChild.setAttribute("src",work.video);
  wnode.querySelector(".w_gitem2").textContent = work.description;
  //DETAILS//
  var dnode = wnode.querySelectorAll(".p_details").item(0);

  for (var o = 0; o < work.details.length;o++){
    var deet = document.importNode(temps.item(0).content.querySelector("div"),true);
    deet.firstElementChild.textContent = work.details[o];
    deet.lastElementChild.textContent = work.detailsContent[o];
    dnode.appendChild(deet);
  }
  //LINK//
  var lnode = wnode.getElementsByClassName("p_details")[1].getElementsByClassName("p_detail")[0];
  if (work.link.show != "true")
  {
    lnode.style.display = "hidden";
  }
  else
  {
    lnode.lastElementChild.firstElementChild.setAttribute("href",work.link.url);
    lnode.lastElementChild.firstElementChild.firstElementChild.textContent = work.link.info;
  }

  //IMAGES//
  var imnode = wnode.querySelector(".w_gitem4");
  for (var o = 0; o < work.images.length;o++){
    var _img = document.importNode(temps.item(1).content.querySelector("a"),true);
    _img.setAttribute('href','works/'+work.images[o]);
    _img.querySelector("img").setAttribute('src','works/'+work.images[o]);
    imnode.appendChild(_img);
  }
  //EMBEDS//
  var emnode = wnode.querySelector(".w_gitem5");
  for (var o = 0; o < work.embeds.length;o++){
    var _emb = document.importNode(temps.item(2).content.querySelector("iframe"));
    for (var p = 0; p < work.embeds[o].attributes.length;p++){
      _emb.setAttribute(work.embeds[o].attributes[p].k,work.embeds[o].attributes[p].v);
    }
    emnode.appendChild(_emb);
  }
  document.querySelector(".works-content").appendChild(wnode);
}
