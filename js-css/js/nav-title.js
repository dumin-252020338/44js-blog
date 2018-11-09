const articleSend = document.querySelector('#nav .article-send')
const a = articleSend.getElementsByTagName('.no-f5')
const li = document.querySelector('ul li')
const div = document.querySelector('#rightBtn div')
console.log('12')

    if(div.className === 'user-logout'){
        console.log('123')
        a.href = 'javascript:;'
    }

