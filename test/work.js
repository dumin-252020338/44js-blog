self.onmessage = function(e){
    let str = '';
    let num = 500
    for(let i=0; i<num; i++){
        str += String.fromCharCode(i)
    }


    self.postMessage(str)
}