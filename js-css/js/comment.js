    const comment = document.querySelector('#comment')
    const ul = comment.querySelector('ul.comment-list')
    const commentTxt = comment.querySelector('#comment-txt')
    const btn = comment.querySelector('#btn')
    
    layui.use(['element', 'layer'], function(){
        const layer = layui.layer,
            $ = layui.$;
        $('#comment button').click(async()=>{
            let commentTxt = commentTxt.innerHTML.trim()
            if(commentTxt){
                const data={
                    commentTxt,
                    articles: $("#artilceDetails .title").data("artid")
                }
            $.post("/article/addComment",data, ()=>{
                layer.msg(data.msg),{
                    time:1000,
                    end(){
                        if(data.status===1){
                            window.location.reload()
                        }
                    }
                }
            })
            }
        })


    })


    