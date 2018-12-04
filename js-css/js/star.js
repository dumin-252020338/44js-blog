;let {random, floor, max, min} = Math
    //创建构造函数
    let fn = function (color, t, l, x, y){
        this.color = color,
        this.top = t;
        this.left = l;
    }
    fn.prototype = {
        //生成随机颜色
        rgba: function (){
            return "rgba("+Math.floor(Math.random() *226)+", "+Math.floor(Math.random() *226)+", "+Math.floor(Math.random() *226)+", 1)"
        },
        //随机盒子top
        topPos: function (){
            return floor(random() * 800 + 5)
        },
        //随机盒子left
        leftPos: function (){
            return floor(random() * 1600 + 100)
        }
    }
    //生成多个p标签
    const star = document.querySelector('#con')
    for(let i=0; i<100; i++){
        star.innerHTML += "<p></p>";
    }
    let timer
    timer = function(){
        let arr = (new Array(100)).fill(new fn())//创建一个长度为50的数组，每一项都是一个实例化的对象
        let p = document.querySelectorAll("p")
        // console.log(p)
        for(let i=0,len=arr.length; i<len; i++){
            // console.log(p[i])
            p[i].style.background = arr[i].rgba();
            p[i].style.top = arr[i].topPos() +'px';
            p[i].style.left = arr[i].leftPos() +'px';
        }
    }
    setInterval(timer,100)