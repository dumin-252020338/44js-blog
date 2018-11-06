
// layui.define(['layer', 'form'], function(exports){
//     var layer = layui.layer
//     ,form = layui.form;
    
//     layer.msg('Hello World');
    
//     exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
//   });    

// layui.use(["layer", "form"], function () {
//     var layer = layui.layer,
//         form = layui.form;
//         layer.msg('hello');
    // 如果只加载一个模块，可以不填数组。如：layui.use('form')

    let user = document.querySelector('.user input')
    let phone = document.querySelector('.phone input')
    let pwd = document.querySelector('.pwd input')
    let pwds = document.querySelector('.pwds input')
    let email = document.querySelector('.email input')
    let btn = document.querySelector('.btn .layui-btn')
    //检验用户名
    let userValue = '';
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    user.onblur = function () {
        //用户名正则，4到16位（字母，数字，下划线，减号）
        userValue = user.value;
        if (!uPattern.test(userValue)) {
            user.value = "";
            user.style.color = '';
            // layer.msg('用户名不符合要求'); 
        } else {
            user.style.color = 'red';
        }
    }
    //检验手机号
    let phId = '';
    phone.onblur = function () {
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        phId = phone.value;
        let phArry = phId.split("");
        if (reg.test(phId) && phArry.length === 11) {
            phone.style.color = 'red';
        } else {
            // layer.msg('手机号不符合要求'); 
            phone.value = "";
            phone.style.color = '';
        }
    }
    //检验密码
    let pwdValue = '';
    pwd.onblur = function () {
        let //密码强度正则，    
            pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        pwdValue = pwd.value;

        if (!pPattern.test(pwdValue)) {
            // layer.msg('密码不符合要求'); 
            pwd.value = "";
            pwd.style.color = '';
        } else {
            pwd.style.color = 'red';
        }
    }
    //检验密码
    let pwdsValue = '';
    pwds.onblur = function () {
        pwdsValue = pwds.value;
        if (pwds.value === pwd.value) {
            pwds.style.color = 'red';
        } else {
            // layer.msg('两次密码不一致'); 
            pwd.value = "";
            pwd.style.color = '';
            pwds.value = "";
            pwds.style.color = '';
            pwd.focus();
        }
    }
    //检验邮箱
    let emailValue = '';
    email.onblur = function () {
        let //@之前必须有内容且只能是字母（大小写）、数字、下划线(_)、减号（-）、点（.）
            //@和最后一个点（.）之间必须有内容且只能是字母（大小写）、数字、点（.）、减号（-），且两个点不能挨着=
            //最后一个点（.）之后必须有内容且内容只能是字母（大小写）、数字且长度为大于等于2个字节，小于等于6个字节
            ePattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        emailValue = email.value;

        if (!ePattern.test(emailValue)) {
            email.style.color = '';
            email.value = "";
            // layer.msg('邮箱不符合要求'); 
        } else {
            email.style.color = 'red';

        }
    }
    //提交按钮
    console.log(btn)
    btn.onclick = function () {
        if (uPattern.test(userValue) && phone.style.color === 'red' && pwd.style.color === 'red' && pwds.style.color === 'red' && email.style.color === 'red') {
            console.log(111)
            let allStr = '';
            allStr += `?phone=${phId}&user=${userValue}&pwd=${pwdValue}&email=${emailValue}`;

            console.log(allStr)
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://localhost:3001" + allStr);
            // console.log('123')
            xhr.send()
            xhr.onload = function () {
                console.log(2)
                console.log(xhr.readyState)
                if (xhr.readyState !== 4) return;
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    console.log(JSON.parse(xhr.responseText))
                    const msg = JSON.parse(xhr.responseText)
                    alert(msg.msg)
                }
            }

            btn.innerHTML = "注册成功"
            btn.style.backgroundColor = "green"
        } else {
            btn.innerHTML = "注册失败";
            btn.style.backgroundColor = "red"
            console.log(222)
        }
    }
// });