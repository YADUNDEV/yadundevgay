import LpList from '../../../scripts/helpers/LpList.js';

export default class ImageMarquee {
    constructor(divElement, imageElements, worksCollection) {
        this.divElement = divElement;
        this.imageElements = imageElements.toArray();
        this.worksCollection = worksCollection;
        this.selected = 0;
        for (var i = 0; i < this.imageElements.length;i++) {
            this.imageElements[i].querySelector("img").addEventListener("click",(function(extra1){this.clickImage(extra1);}).bind(this,i));
        }
        this.imageElements[this.selected].querySelector("img").setAttribute("class","w_marqueeimg_sel");
        this.scrollToSelected();
    }
    clickImage(index) {
        if (index < 0 || index >= this.imageElements.length) {
            return;
        }
        if (this.selected == index) {
            this.worksCollection.previewImage(this.imageElements[index].querySelector("img").getAttribute("src"));
            return;
        }
        this.imageElements[this.selected].querySelector("img").setAttribute("class","w_marqueeimg_idle");
        this.selected = index;
        this.imageElements[this.selected].querySelector("img").setAttribute("class","w_marqueeimg_sel");
        this.scrollToSelected();
    }
    scrollToSelected() {
        var imCenterX = this.imageElements[this.selected].offsetLeft+(this.imageElements[this.selected].offsetWidth*.5);
        //-(this.divElement.getAttribute("padding-left")*2))*.5)
        this.divElement.scroll(imCenterX-((this.divElement.offsetWidth*.5)),0);
        //this.imageElements[this.selected].scrollIntoView();
    }
}