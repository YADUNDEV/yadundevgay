var frames;
var links = [];

window.onload = function()
{
  frames = document.getElementsByTagName("IFRAME");
  links = [frames.length];

  for (var i = 0; i < links.length;i++)
  {
    links[i] = frames[i].getAttribute("src");
  }
  //alert(frames.length);
  //updateVisibility();
  window.setInterval(updateVisibility,3000);
}
function checkVisible(elm)
{
  var bounding = elm.getBoundingClientRect();

	// Check if it's out of the viewport on each side
	var otop = bounding.top < 0;
	var oleft = bounding.left < 0;
	var obot = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	var oright = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	return !(otop && oleft && obot && oright);
}

function updateVisibility()
{
  //alert(frames.length);
  //alert(links[0]);
  for(var i = 0; i < frames.length;i++)
  {
    //if (!checkVisible(frames[i]) && frames[i].getAttribute("src")!="")
    if (checkVisible(frames[i]) && frames[i].getAttribute("src")=="")
    {
      frames[i].setAttribute("src",links[i]);
      //alert(i.toString+" IS VISIBLE");
    }
    else if ( frames[i].getAttribute("src")!="")
    {
      frames[i].setAttribute("src","");
      //alert(i.toString+" IS INVISIBLE");
    }
    //else
  }
}
