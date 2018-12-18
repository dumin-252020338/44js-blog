const li = document.querySelectorAll('#nav ul li')
const span = document.querySelector('#nav ul li span')
    for(let i=0; len=li.length, i<len; i++){
        li[i].onmouseenter = function(){
            span.style.display = "inline-block";
            span.style.left = (38 + i*96)+'px';
            span.style.top = "28px";
        }
        li[i].onmouseleave = function(){
            span.style.cssText = "";
        }
    }
