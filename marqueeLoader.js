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
var loaded = 0;
var _photos = [];
function generateImages()
{
  for (var i = 19; i >= 0; i--){
    loadJSON(
      function(response)
      {
        var wd = JSON.parse(response);
        if (wd.images.length > 0)
        {
          for (var o = 0; o < wd.images.length;o++){
            _photos.push(wd.images[o]);
          }
        }
        loaded +=1;
        if (loaded == 19){
          AssignImgs();
        }
      },'workdata/preview'+i.toString()+'.json'
    );
  }
}
function AssignImgs()
{
  var imgs = document.getElementsByClassName("h-img-i");
  var filename = "works/";/*(window.location.pathname).substring(1,window.location.pathname.length-9)+"works/"*/
  var num = 0;
  for (var p = 0; p < imgs.length;p++)
  {
    num = Math.floor(Math.random()*(_photos.length-1));
    imgs[p].src = filename+_photos.pop(num);
    imgs[p].alt = num.toString();
  }
}

window.onload = generateImages();
