/* function used to get the CSS Style Value */
function GetCCSStyleValue(className, property){ 
    for(var m in document.styleSheets){
        if(document.styleSheets[m].href.indexOf('Styles') != -1){
            var mysheet=document.styleSheets[m]; 
            var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules;
            var _value=0;
            for (var i=0; i<myrules.length; i++){
               if(myrules[i].selectorText.toLowerCase()==className){
                    var _style = myrules[i].style[property];
                    if(_style.substr(-2) == "em"){
                       _value = _style.substring(0, _style.length - 2) * 16;
                        break;
                    }else if(_style.substr(-2) == "px"){
                       _value = _style.substring(0, _style.length - 2);
                        break;
                    }else if(_style.substr(-1) == "%"){
                        if(property == "width"){
                            _value = _style.substring(0, _style.length - 1) * window.innerWidth / 100;
                        }else if(property == "height"){
                            _value = _style.substring(0, _style.length - 1) * window.innerHeight / 100;
                        }
                        break;
                    }else{
                        _value = 1;
                        break;
                    }
                    break;
                }
            }  
            return _value;
        }
    }
} 

/* Sort function to Sort Array */
var sortBy = function (key, minor) {
    return function (o, p) {
        var a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[key];
            b = p[key];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
    }        
};
        
/* Used to reorder the DOM Nodes */
function orderDOM(){
    var ul = document.createElement('ul');
    //ul.setAttribute('id','proList');

     var arr = [];
     var productList = [];


     arr = (document.getElementById("animals").getElementsByTagName("li"));

     for(i = 0; i < arr.length; i++){
        productList.push(
            {
                className: arr[i].className, 
                value: arr[i].firstChild.nodeValue, 
                width: GetCCSStyleValue("."+arr[i].className, "width"), 
                height: GetCCSStyleValue("."+arr[i].className, "height"),
                area: GetCCSStyleValue("."+arr[i].className, "width") * GetCCSStyleValue("."+arr[i].className, "height")
            }
        );             
     }

    productList.sort(sortBy('value', sortBy('area')));   


    var t, tt;
    while (document.getElementById('renderList').firstChild) {
        document.getElementById('renderList').removeChild(document.getElementById('renderList').firstChild);
    }
    
    document.getElementById('renderList').appendChild(ul);
    productList.forEach(renderProductList);

    function renderProductList(element, index, arr) {

        var li = document.createElement('li');

        li.setAttribute('class', element.className);
        ul.appendChild(li);

        t = document.createTextNode(element.value);
        li.innerHTML=li.innerHTML + element.value;
    }
}