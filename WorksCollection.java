$('.works-content').infiniteScroll({
  path: '.pagination__next',
  append: '.works-content-iFrame',
  status: '.scroller-status',
  hideNav: '.pagination'
});

/*public class WorkData
{
  public String buttonid;
  public String title;
  public String date;
  public String video;
  public String description;
  public String details[];
  public String detailsContent[];
  public String images[];
  public String embeds[];
}*/

window.onload = init();

function init() {
  loadJSON(
    function(response)
    {
      var wd = JSON.parse(response);
      loadContent(wd);
    },'workdata/preview0.json'
  );
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

/*
  works = new WorkData[1];
  for (int i = 0; i < 1; i++){
    var xmlhttp = new XMLHttpRequest();
  }
  loadContent();*/
}

function loadContent(work){
  var wtemp = document.getElementsByTagName("template")[0];
  var wblock = wtemp.content.querySelector("div");

  var wnode = document.importNode(wblock,true);
  var wbutt = wnode.querySelector(".accordion");
  //THUMBNAIL//
  butt.attr("id",work.buttonid);
  butt.querySelector(".w_title").textContent = work.title;
  butt.querySelector(".w_date").textContent = work.date;
  //VIDEO AND DESCRIPTION//
  wnode.querySelector(".w_gitem1").textContent = work.video;
  wnode.querySelector(".w_gitem2").textContent = work.description;
  //DETAILS//
  var dnode = wnode.querySelector(".p_details");
  for (var o = 0; o < work.details.length;o++){
    dnode.textContent += "<div class = 'p_detail'><h1>'"+
    work.details[o]+
    "'</h1><h2>"+
    work.detailsContent[o]+
    "'</h2></div>";
  }
  //IMAGES//
  var imnode = wnode.querySelector(".w_gitem4");
  for (var o = 0; o < work.images.length;o++){
    imnode.textContent += "<a href = "+"'works/"+work.images[o]+"'"+
    " target = '_blank'><img src = 'works/"+work.images[o]+"'></a>";
  }
  //EMBEDS//
  var emnode = wnode.querySelector(".w_gitem5");
  for (var o = 0; o < work.embeds.length;o++){
    emnode.textContent+=work.embeds[o];
  }
  document.getElementsByClassName(".works-content")[0].appendChild(wnode);
}
