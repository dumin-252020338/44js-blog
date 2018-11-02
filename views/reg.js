let phone = document.getElementsByClassName('phone')[0],
            name = document.getElementsByClassName('name')[0],
            pwd = document.getElementsByClassName('pwd')[0],
            pwds = document.getElementsByClassName('pwds')[0],
            email = document.getElementsByClassName('email')[0],
            code = document.getElementsByClassName('code')[0],
            span = document.getElementsByTagName('span'),
            con = document.getElementsByClassName('con')[0],
            btn = document.getElementsByTagName("button")[0];
            //检验手机号
            let phId = '';
            phone.onblur = function(){
                let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
                    phId = phone.value;
                let phArry = phId.split("");
                
                    if(!reg.test(phId)){
                        span[0].classList.remove("on");
                        span[1].classList.add("on");
                        // phone.value = "";
                        phone.focus();
                    }else{
                        span[0].classList.add("on");
                        span[1].classList.remove("on");
                        
                    }
                    if(phArry.length ===11){
                        phone.style.color = 'red';
                    }
            }
            //检验用户名
            let nameValue = '';
            name.onblur = function(){
                let //用户名正则，4到16位（字母，数字，下划线，减号）
                    uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
                    nameValue = name.value;
                    
                    if(!uPattern.test(nameValue)){
                        span[2].classList.add("nameOn");
                        span[3].classList.remove("nameOn");
                        name.value = "";
                        name.focus();
                    }else{
                        span[2].classList.remove("nameOn")
                        span[3].classList.add("nameOn");
                    }
            }
            //检验密码
            let pwdValue ='';
            pwd.onblur = function(){
                let //密码强度正则，    
                    pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; 
                    pwdValue =pwd.value;
                    
                    if(!pPattern.test(pwdValue)){
                        span[4].classList.add("pwdOn");
                        span[5].classList.remove("pwdOn");
                        pwd.value = "";
                        pwd.focus();    
                    }else{
                        span[4].classList.remove("pwdOn");
                        span[5].classList.add("pwdOn");
                       
                    } 
            }
            //检验密码
            let pwdsValue ='';
            pwds.onblur = function(){
                pwdsValue =pwds.value;
                    if(pwds.value === pwd.value){
                        span[6].classList.remove("pwdsOn");
                        span[7].classList.add("pwdsOn");
                    }else{
                        span[6].classList.add("pwdsOn");
                        span[7].classList.remove("pwdsOn");
                        pwds.value = "";
                        pwd.value = "";
                        pwd.focus();
                    }
            }
            //检验邮箱
            let emailValue ='';
            email.onblur = function(){
                let //@之前必须有内容且只能是字母（大小写）、数字、下划线(_)、减号（-）、点（.）
                    //@和最后一个点（.）之间必须有内容且只能是字母（大小写）、数字、点（.）、减号（-），且两个点不能挨着=
                    //最后一个点（.）之后必须有内容且内容只能是字母（大小写）、数字且长度为大于等于2个字节，小于等于6个字节
                    ePattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    emailValue =email.value;
                    
                    if(!ePattern.test(emailValue)){
                        span[8].classList.add("emailOn");
                        span[9].classList.remove("emailOn");
                        email.value = "";
                    }else{
                        span[8].classList.remove("emailOn");
                        span[9].classList.add("emailOn");
                       
                    } 
            }
            //生成随机验证码
            run()
            function run(){
                function bgc(){
                    let r=Math.floor(Math.random()*256),
                        g=Math.floor(Math.random()*256),
                        b=Math.floor(Math.random()*256);
                        return "rgb("+r+','+g+','+b+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
                    }
                    con.style.backgroundColor = bgc();
                    let arry = [];
                        for(let i=0; i<4 ;i++){
                            let num = Math.floor(Math.random()*9 + 1);
                            arry[i] = num; 
                        }
                        con.value = arry;
                }
            con.onclick = function(){
                run()
             }
            //检验验证码是否正确
            let codeArry = '',
                conArry = '';
            code.onblur = function(){
                codeArry = code.value.split('').toString();//字符串转数组 再转字符串
                conArry = con.value.split(',').toString();
                // console.log(codeArry)
                // console.log(conArry)
                if(codeArry === conArry){
                    span[10].classList.remove("codeOn");
                    span[11].classList.add("codeOn");
                }else{
                    span[11].classList.remove("codeOn");
                    span[10].classList.add("codeOn");
                }
            }
            //注册按钮
            btn.onclick = function(){
                if(span[0].className === 'on' && span[3].className === "nameOn" && span[5].className === "pwdOn" && span[7].className === "pwdsOn" && span[9].className === "emailOn" && codeArry === conArry){
                    // $.ajax({
                    //     url:"http://localhost:3001",
                    //     method:"get",
                    //     data:{
                    //         phone: phId,
                    //         name: nameValue,
                    //         pwd: pwdValue,
                    //         email: emailValue,
                    //     }
                    // })

                    let allStr = '';
                        allStr += `?phone=${phId}&user=${nameValue}&pwd=${pwdValue}&email=${emailValue}`;
                        
                        console.log(allStr)
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET","http://localhost:3000"+allStr);
                        // console.log('123')
                        xhr.send();
                        xhr.onload = function(){
                            // console.log(xhr.readyState)
                            if(xhr.readyState !== 4 )return;
                            if(xhr.status >=200 && xhr.status <300 ||xhr.status === 304){
                                // console.log(JSON.parse(xhr.responseText))
                                // let msg = JSON.parse(xhr.responseText)
                                console.log('123')
                                // alert(msg.msg)
                            }
                        }    

                    btn.innerHTML = "注册成功"
                    btn.style.backgroundColor = "green"
                }else{
                    btn.innerHTML = "注册失败";
                    btn.style.backgroundColor = "red"
                }
            }