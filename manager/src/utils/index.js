let f = {
    changeDate(time, status) {
        let date = time ? new Date(time) : new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let mi = date.getMinutes();
        let s = date.getSeconds();
        let str = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
        str = status ? str + ' ' + (h < 10 ? '0' + h : h) + ":" + (mi < 10 ? '0' + mi : mi) + ":" + (s < 10 ? '0' + s : s) : str;
        return str
    },
    doSearch(object){
        let str = ''
        for(let k in object){
            if((object[k] || object[k]===0) && k.indexOf('Status')==-1){
                str = str + k + ',' + object[k] + ',' + (object[k+'Status']?true:false) + ";";
            }
        }
        return str;
    }
}
export default f;