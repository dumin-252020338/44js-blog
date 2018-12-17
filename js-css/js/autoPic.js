let wrap = document.getElementById("wrap"),
    listp = document.querySelectorAll('.list-p p'),
    listimg = document.querySelectorAll('.list-img li'),
    listspan = document.querySelectorAll('.dot span'),
    right = document.getElementsByClassName('right')[0],
    left = document.getElementsByClassName('left')[0],
    index = 0,
    btn = document.getElementsByClassName('btn'),
    norbtn = document.getElementsByClassName('nor-btn')[0],
    cirbtn = document.getElementsByClassName('cir-btn')[0];
    bgc = "#f55";
        //样式消失
        function none(){
            listp[index].className ='';
            listimg[index].classList ='';
            listspan[index].className ='';
        }
        //样式出现
        function active(){
            listp[index].className ='active';
            listimg[index].classList ='active';
            listspan[index].className ='active-dot';
            //随机颜色
            const {floor, random} = Math;
            function rgba(){
                return "rgba("+floor(random()*225+1)+", "+floor(random()*225+1)+", "+floor(random()*225+1)+", "+random().toFixed(1)+")"
            }
            listimg[index].style.backgroundColor = rgba();
        }  
        //正常播放
        norbtn.onclick = function (){
            norbtn.style.backgroundColor ="#f55";
            cirbtn.style.backgroundColor ='';
            btn[0].style.cssText = "display:inline";
            btn[1].style.cssText = "display:inline";
             //右按钮
            right.onclick = function () {
                none()
                index++;
                if(index > 4 ){
                    index = 4;
                }
            active()
            }
            //左按钮
            left.onclick = function () {
                none()
                index--;
                if(index < 0 ){
                    index = 0;
                }
                active()
            }
        }
        //循环播放
        cirbtn.onclick = function(){
            cirRun();
        };
        //点击按钮播放对应图片
        for(let i=0, len=listspan.length; i<len; i++){
            listspan[i].onclick = function(){
                none()
                
                index = i-1;

                listspan[i].className ='active-dot';
                listp[i].className ='active';
                listimg[i].classList ='active';

                index++;
            }
        }
        //打开自动轮播
        let autoPicTimer;
        autoRun();
        function autoRun(){
            autoPicTimer = setInterval(function(){
                none()
                index++;
                if(index > 4 ){
                    index = 0;
                }
                active()
        },1000)    
        }
        //鼠标离开继续自动轮播
        wrap.onmouseleave = function(){
            autoRun(); 
        }
        //鼠标进入停止自动轮播
        wrap.onmouseenter= function(){
            clearInterval(autoPicTimer)
        }
        function cirRun() {
            norbtn.style.backgroundColor ='';
            cirbtn.style.backgroundColor ="#f55";
            
            //右按钮
            right.onclick = function () {
                none()
                index++;
                if(index > 4 ){
                    index = 0;
                }
                active()
            }
            //左按钮
            left.onclick = function () {
                none()
                index--;
                if(index < 0 ){
                    index = 4;
                }
                active()
            }
        }
        wrap.onmouseenter= function(){
            btn[0].style.cssText = "display:inline";//左右按钮显示
            btn[1].style.cssText = "display:inline";
        }
        wrap.onmouseleave= function(){
            btn[0].style.cssText = "";//左右按钮消失
            btn[1].style.cssText = "";
        }
