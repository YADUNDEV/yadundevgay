import LpList from '../../../scripts/helpers/LpList.js';
import ImageMarquee from './ImageMarquee.js';
export default class WorksCollection {
  constructor(document, window) {
    this.worksList = new LpList({});
    this.worksElements = new LpList({});
    this.imageMarquees = new LpList({});
    this.document = document;
    this.window = window;
    console.log(this.window.parent.document);
    this.imagePreview = this.window.parent.document.querySelector(".image-preview-container-hidden").parentElement;
    this.imagePreview.lastElementChild.addEventListener("click",(()=>{this.hideImage();}).bind(this));
    this.fullyInitialized = false;
    this.worksCount = 22;
    console.log(document);
    console.log(window);
    //document.addEventListener('DOMContentLoaded',this.initWorkList);
    //this.initWorkList();
    //this.document.addEventListener('scroll',this.endOfPageCheck);
  }
  initWorkList() {
    console.log("initworklist");
    for (var i = this.worksCount; i >= 0; i--){
      this.loadJSON('workdata/preview'+i.toString()+'.json');
    }
  }
  loadJSON(path){
    var xobj = new XMLHttpRequest();
    var tt = this;
    xobj.overrideMimeType("application/json");
    xobj.open('GET',path,true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == XMLHttpRequest.DONE && ((xobj.status >= 200 && xobj.status < 400) || xobj.status == 0)) {
        tt.onLoadJSON(xobj.responseText,tt);
      }
    };
    xobj.send(null);
  }
  onLoadJSON(response,scopeOb) {
    var wd = JSON.parse(response);
    //console.log(wd.title);

    scopeOb.worksList.add(wd);
    //console.log("COMP "+(scopeOb.worksList.length()-1)+" -- "+scopeOb.worksCount);
    if (scopeOb.worksList.length()-1 == scopeOb.worksCount) {
      //console.log("equal");
      scopeOb.fullyInitialized = true;
      scopeOb.worksList.sort((pv,cv)=>{
        return cv.order > pv.order;
      });
    }
  }
  loadContent(work,scopeOb){
    var wblock = scopeOb.document.getElementsByTagName("template").item(0).content.querySelector("article");
    var wnode = scopeOb.document.importNode(wblock,true);
    var temps = wnode.querySelectorAll('template');
    //console.log(temps);
    var wbutt = wnode.querySelector(".accordion");
    //ADD BUTTON EVENT LISTENER//
    wbutt.addEventListener("click", function(){
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
    wbutt.setAttribute("style","background-image: url(workdata/files/"+work.thumbnail+");");
    wbutt.querySelector(".w_title").textContent = work.title;
    wbutt.querySelector(".w_date").textContent = work.date;
    //VIDEO AND DESCRIPTION//
    if (work.video == "") {
      var _vid = wnode.querySelector(".w_video");
      //var _vidi = _vid.firstElementChild;
      _vid.parentElement.removeChild(_vid);
      //_vid.setAttribute("padding-bottom","0%");1
    }
    else {
      wnode.querySelector(".w_video").firstElementChild.setAttribute("src",work.video);
    }
    wnode.querySelector(".w_description").firstElementChild.textContent = work.description;
    //DETAILS//
    var dnode = wnode.querySelectorAll(".p_details").item(0);
  
    for (var o = 0; o < work.details.length;o++){
      var deet = scopeOb.document.importNode(temps.item(0).content.querySelector("div"),true);
      deet.firstElementChild.textContent = work.details[o].k;
      deet.lastElementChild.textContent = work.details[o].v;
      dnode.appendChild(deet);
    }
    //LINK//
    var lnode = wnode.getElementsByClassName("p_details")[1].getElementsByClassName("p_detail")[0];
    lnode.firstElementChild.style.display = "none";
    lnode.lastElementChild.firstElementChild.style.display = "none";
    lnode.lastElementChild.firstElementChild.firstElementChild.style.display = "none";
    for (var o = 0; o < work.links.length;o++) {
      if (work.links[o].show=="true") {
        var _link = scopeOb.document.importNode(lnode,true);
        _link.lastElementChild.firstElementChild.setAttribute("href",work.links[o].url);
        _link.lastElementChild.firstElementChild.firstElementChild.textContent = work.links[o].info;
      }
    }
  
    //IMAGES//
    var imnode = wnode.querySelector(".w_marquee");
    if (work.images.length < 1) {
      imnode.parentElement.removeChild(imnode);
    }
    else {
      var _imEls = new LpList({});
      for (var o = 0; o < work.images.length;o++){
        var _img = scopeOb.document.importNode(temps.item(1).content.querySelector("div"),true);
        /*_img.setAttribute('href','works/'+work.images[o]);*/
        _img.querySelector("img").setAttribute('src','workdata/files/'+work.images[o]);
        var _imnodeob = imnode.appendChild(_img);
        var _imuri=work.images[o];
        _imEls.add(_imnodeob);
        //_imnodeob.addEventListener("click",(function(extra1) {this.previewImage(extra1);}).bind(this,_imuri));
      }
      this.imageMarquees.add(new ImageMarquee(imnode,_imEls,this));
    }
    //EMBEDS//
    /*var emnode = wnode.querySelector(".w_gitem5");
    for (var o = 0; o < work.embeds.length;o++){
      var _emb = this.document.importNode(temps.item(2).content.querySelector("iframe"));
      for (var p = 0; p < work.embeds[o].attributes.length;p++){
        _emb.setAttribute(work.embeds[o].attributes[p].k,work.embeds[o].attributes[p].v);
      }
      emnode.appendChild(_emb);
    }*/
    scopeOb.document.querySelector(".works-content").appendChild(wnode);
    return wnode;
  }
  endOfPageCheck(scopeOb) {
    //console.log("scrolling?");
    //if (!scopeOb.fullyInitialized) {return false;}
    if (scopeOb.worksElements.length() < scopeOb.worksList.length()) {
      if (scopeOb.worksElements.length() == 0) {
        scopeOb.spawnWork(scopeOb);
        return true;
      }
      var ob = scopeOb.worksElements.getAt(scopeOb.worksElements.length()-1);
      var endd = ob.offsetParent.offsetParent.offsetHeight+ob.offsetParent.offsetParent.scrollTop;
      //console.log("COMP: "+" -- "+(ob.offsetTop)+" -- "+endd);
      if (ob.offsetTop <= endd) {
        scopeOb.spawnWork(scopeOb);
        return true;
      }
    }
    //if ((this.window.innerHeight + this.window.scrollY) >= this.document.body.scrollHeight) {
     
    //}
    return false;
  }
  spawnWork(scopeOb) {
    scopeOb.worksElements.add(scopeOb.loadContent(scopeOb.worksList.getAt(scopeOb.worksElements.length()),scopeOb));
    scopeOb.endOfPageCheck(scopeOb);
  }
  previewImage(src) {
    var arr = [this.imagePreview.children[0],this.imagePreview.children[0].children[0],this.imagePreview.children[0].children[0].children[0],this.imagePreview.children[1]];
    for (var i = 0; i < arr.length;i++) {
      arr[i].setAttribute("class",arr[i].getAttribute("class").replace("hidden","shown"));
    }
    this.imagePreview.querySelector(".previewed-image-shown").setAttribute("src","./subpages/works/"+src);
  }
  hideImage() {
    var arr = [this.imagePreview.children[0],this.imagePreview.children[0].children[0],this.imagePreview.children[0].children[0].children[0],this.imagePreview.children[1]];
    for (var i = 0; i < arr.length;i++) {
      arr[i].setAttribute("class",arr[i].getAttribute("class").replace("shown","hidden"));
    }
  }
}