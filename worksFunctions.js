/*var elem = document.querySelector('.works-content');
var infScroll = new InfiniteScroll( elem, {
  // options
  path: '.pagination__next',
  append: '.works-content-iFrame',
  history: false,
  debug: true
});

// element argument can be a selector string
//   for an individual element
var infScroll = new InfiniteScroll( '.works-content-iFrame', {
  // options
});


var nextPages = [
  "works/golf/preview.html" 					,
  "works/fromform/preview.html" 			,
  "works/spinnyships/preview.html" 		,
  "works/gravitymasters/preview.html" ,
  "works/pfproto/preview.html" 				,
  "works/ccproto/preview.html" 				,
  "works/aurora/preview.html" 				,
  "works/parallel/preview.html" 			,
  "works/socc/preview.html" 					,
  "works/hope/preview.html" 					,
  "works/sputnik/preview.html" 				,
  "works/bonebois/preview.html" 			,
  "works/backfire/preview.html" 			,
  "works/juice/preview.html" 					,
  "works/echoes/preview.html" 				,
  "works/mcp/preview.html" 						,
  "works/robocatouya/preview.html" 		,
  "works/skelebuddy/preview.html" 		,
  "works/safe/preview.html"
];

$('.works-content').infiniteScroll({
  path: function() {
    return nextPages[ this.loadCount ];// + '.html';
  },
  // options...
});*/





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
