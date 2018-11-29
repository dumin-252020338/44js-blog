let wrap = document.getElementById("wrap"),
            listp =document.getElementsByTagName('p'),
            listimg =document.getElementsByTagName('li'),
            listspan =document.getElementsByTagName('span'),
            right =document.getElementsByClassName('right')[0],
            left =document.getElementsByClassName('left')[0],
            index = 0,
            btn = document.getElementsByClassName('btn'),
            norbtn =document.getElementsByClassName('nor-btn')[0],
            cirbtn =document.getElementsByClassName('cir-btn')[0];
            bgc = "#f55";

        //样式消失
        function none(){
            listp[index].className ='';
            listimg[index].className ='';
            listspan[index].className ='';
        }
        //样式出现
        function active(){
            listp[index].className ='active';
            listimg[index].className ='active';
            listspan[index].className ='active-dot';
        }  
        //正常播放
        norbtn.onclick = function () {
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
                listimg[i].className ='active';

                index++;
            }
        }
        //打开自动轮播
        let timer;
        autoRun();
        function autoRun(){
            timer = setInterval(function(){
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
        wrap.onmouseenter = function(){
            clearInterval(timer)
        }
        function cirRun() {
            norbtn.style.backgroundColor ='';
            cirbtn.style.backgroundColor ="#f55";
            btn[0].style.cssText = "display:inline";
            btn[1].style.cssText = "display:inline";
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