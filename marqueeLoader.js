

function generateImages()
{
  var files =
  [
    'aurora/ANScreenShot.jpg',

    'backfire/gameplay.gif',
    'backfire/title.gif',

    'bonebois/bb1.gif',
    'bonebois/bbtitle.gif',
    'bonebois/fire.gif',
    'bonebois/gameplay.gif',

    'ccproto/sliders.gif',

    'echoes/chase.gif',
    'echoes/door.gif',
    'echoes/respite.gif',
    'echoes/title.gif',

    'fromform/thumbnail.gif',

    'golf/cards.gif',
    'golf/grass.gif',

    'gravitymasters/thumbnail.gif',

    'hope/hope.gif',
    'juice/OOS_JUICE.png',

    'mcp/mcthumgj.gif',
    'mcp/mcscreen1.png',

    'parallel/PARALLEL_SCREEN_1.jpg',
    'parallel/PARALLEL_SCREEN_2.jpg',
    'parallel/PARALLEL_SCREEN_3.jpg',

    'pfproto/gross.gif',

    'robocatouya/rbouyathumb.PNG',
    'robocatouya/robocat.gif',
    'robocatouya/SS3.png',
    'robocatouya/SS7.png',

    'safe/corpse.png',
    'skelebuddy/sbthumb.gif',

    'socc/looper.gif',
    'spinnyships/gyro9.gif',

    'sputnik/nasa.gif',
    'sputnik/sewers.gif',
    'sputnik/title.gif'
  ];
  var imgs = document.getElementsByClassName("h-img-i");
  var filename = (window.location.pathname).substring(1,window.location.pathname.length-9)+"works/";
  var num = 0;
  for (var i = 0; i < imgs.length;i++)
  {
    num = Math.floor(Math.random()*(files.length-1));
    imgs[i].src = filename+files[num];
    imgs[i].alt = num.toString();
  }
}

window.onload = generateImages();
