
var butts = document.getElementsByClassName('radd');
for (var i = 0; i < butts.length;i++)
{
  butts[i].addEventListener("click",radioLogic);
}
var home = document.getElementById('home');
var works = document.getElementById('works');
var about = document.getElementById('about');

var lastPage = 0;


/*function checkVisible(elm)
{
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var viewWidth= Math.max(document.documentElement.clientWidth, window.innerWidth);
  var xpos = window.
  return (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) || (!(rect.right < 0 || rect.left - viewWidth >= 0));
}

if (!checkVisible(home) && home.getAttribute("src")=="home.html")
{
  home.setAttribute("src","");
  //home.load();
}
else
{
  home.setAttribute("src","home.html");
  //home.load();
}
if (!checkVisible(works) && works.getAttribute("src")=="works.html")
{
  works.setAttribute("src","");
  //works.load();
}
else
{
  works.setAttribute("src","works.html");
  //works.load();
}
if (!checkVisible(about) && works.getAttribute("src")=="about.html")
{
  about.setAttribute("src","");
  //about.load();
}
else
{
  about.setAttribute("src","about.html");
  //about.load();
}
*/
function radioLogic()
{
  for (var i = 0; i < butts.length;i++)
  {
    butts[i].setAttribute("checked","false");
    butts[i].parentElement.setAttribute("class","sbbutton");
  }
  event.target.parentElement.setAttribute("class","sbclicked");
  event.target.setAttribute("checked","true");

  if (event.target.getAttribute("value") == "home")
  {
    home.setAttribute("class","main-page-iFrame");
    works.setAttribute("class","main-page-iFrame-disabled-right");
    about.setAttribute("class","main-page-iFrame-disabled-right");
    if(lastPage == 2)
    {works.setAttribute("class",works.getAttribute("class")+"-instant");}
    lastPage = 0;
  }
  if (event.target.getAttribute("value") == "works")
  {
    home.setAttribute("class","main-page-iFrame-disabled-left");
    works.setAttribute("class","main-page-iFrame");
    about.setAttribute("class","main-page-iFrame-disabled-right");
    lastPage = 1;
  }
  if (event.target.getAttribute("value") == "about")
  {
    home.setAttribute("class","main-page-iFrame-disabled-left");
    works.setAttribute("class","main-page-iFrame-disabled-left");
    about.setAttribute("class","main-page-iFrame");
    if(lastPage == 0)
    {works.setAttribute("class",works.getAttribute("class")+"-instant");}
    lastPage = 2;
  }
}
