    const article = document.querySelector('#article')
    const ul = article.querySelector('ul')
    const input = article.querySelector('.input')
    const btn = article.querySelector('#btn')
    
    btn.onclick = function(){
        let inputValue = input.innerHTML
        if(inputValue){
            function getNowFormatDate() {
                let date = new Date();
                let month = date.getMonth() + 1;//获取并返回当前月份(0-11,0代表1月)
                let day = date.getDate();//获取并返回当前日(1-31)
                let minuter = date.getMinutes()//获取并返回当前分钟(1-60)
                let week = date.getDay(); //获取并返回当前星期X(0-6,0代表星期天)
                let weekArr = [ '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (day >= 0 && day <= 9) {
                        day = "0" + day;
                    }
                    if (minuter >= 0 && minuter <= 9) {
                        minuter = "0" + minuter;
                    }
                let currentdate = date.getFullYear() + '年' + month + '月' + day
                        + "日" + weekArr[week] + "  " + date.getHours() + ":" + minuter
                        ;
                return currentdate;
            }
            let li = document.createElement('li')
            let span = document.createElement('span')
            span.innerHTML = '评论时间：' + getNowFormatDate()
            li.innerHTML = inputValue
            li.appendChild(span)
            ul.appendChild(li)
            input.innerHTML = ""
        }
    }

    