import LpList from './helpers/LpList.js';
export default class PortfolioNavigation {
    constructor(document, window, pageNames) {
        this.window = window;
        this.document = document;
        this.contentArea = this.document.getElementsByClassName("content-iframe-landscape")[0];
        this.topBar = this.document.getElementsByClassName("topbar")[0];
        this.sideBar = this.document.getElementsByClassName("sidebar")[0];
        var butts = this.document.getElementsByClassName("radd");
        this.topButts = new LpList({});
        this.sideButts = new LpList({});
        for (var i = 0; i < butts.length;i++) {
            if (butts[i].parentElement.getAttribute("class").substring(0,2) == "tb") {
                this.topButts.add(butts[i]);
            }
            else {
                this.sideButts.add(butts[i]);
            }
        }
        this.topButts.cycleThrough((ob)=>{
            ob.addEventListener("click",(function(){this.radioLogic(ob);}).bind(this));
        });
        this.sideButts.cycleThrough((ob)=>{
            ob.addEventListener("click",(function(){this.radioLogic(ob);}).bind(this));
        });
        this.pages = new LpList({});
        for (var i = 0; i < pageNames.length;i++) {
            this.pages.add(document.getElementById(pageNames[i]));
        }
        this.lastPage = 0;
        this.window.addEventListener("resize",(function(event) {this.sizeCheck();}).bind(this));
        this.sizeCheck();
    }
    sizeCheck() {
        if (this.window.innerWidth < this.window.innerHeight) {
            this.sideBar.setAttribute("class","sidebar-hidden");
            this.topBar.setAttribute("class","topbar");
            this.contentArea.setAttribute("class","content-iframe-portrait");
        }
        else {
            this.sideBar.setAttribute("class","sidebar");
            this.topBar.setAttribute("class","topbar-hidden");
            this.contentArea.setAttribute("class","content-iframe-landscape");
        }
    }
    radioLogic(button) {
        var goalPage = button.getAttribute("value");
        this.switchButtons(this.topButts,goalPage);
        this.switchButtons(this.sideButts,goalPage);
        this.switchPages(goalPage);
    }
    switchButtons(list, goalPage) {
        list.cycleThrough((ob)=>{
            if (ob.getAttribute("value") == goalPage) {
                ob.setAttribute("checked","true");
                ob.parentElement.setAttribute("class",ob.parentElement.getAttribute("class").substring(0,2)+"clicked");
            } 
            else {
                ob.setAttribute("checked","false");
                ob.parentElement.setAttribute("class",ob.parentElement.getAttribute("class").substring(0,2)+"button");
            }
        });
    }
    switchPages(goalPage) {
        var newPage = this.lastPage;
        var i = 0;
        this.pages.cycleThrough((ob)=>{
            if (ob.id == goalPage) {
                ob.setAttribute("class","main-page-iFrame");
                newPage = i;
            }
            else if (newPage != this.lastPage) { //If the new page has been found
                ob.setAttribute("class","main-page-iFrame-disabled-right");
            }
            else {
                ob.setAttribute("class","main-page-iFrame-disabled-left");
            }
            i+=1;
        });
        if (Math.abs(newPage-this.lastPage) > 1) {//Instant transitions for in-between pages.
            var _min = Math.min(newPage,this.lastPage);
            var _max = Math.max(newPage,this.lastPage);
            i = 0;
            this.pages.cycleThrough((ob)=>{
                if (i > _min && i < _max) {
                    ob.setAttribute("class",ob.getAttribute("class")+"-instant");
                }
                i++;
            });
        }
        this.lastPage = newPage;
    }
}