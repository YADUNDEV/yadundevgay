function loadJSON(callback, path){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET',path,true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == XMLHttpRequest.DONE && ((xobj.status >= 200 && xobj.status < 400) || xobj.status == 0)) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}