
function resize()
{
  if ('parentIFrame' in window) {
    // Fix race condition in FireFox with setTimeout
    setTimeout(parentIFrame.size.bind(parentIFrame),0);
  }
}
function test()
{
  alert("Hello!");
}
$("accordion").click(test);

$("panel").mousemove(resize);
$("accordion").mousemove(resize);
