const li = document.querySelectorAll('#nav ul li')
const a = document.querySelectorAll('#nav ul li a')
const span = document.querySelector('#nav ul li span')
const div = document.querySelectorAll('#nav #rightBtn div')

    for(let i=0; len=li.length, i<len; i++){
        li[i].onmouseenter = function(){
            span.style.display = "inline-block";
            span.style.left = (38 + i*96)+'px';
            span.style.top = "45px";
        }
        li[i].onmouseleave = function(){
            span.style.cssText = "";
        }
    }
