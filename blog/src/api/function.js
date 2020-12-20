
import { Notification } from "element-ui"
const func = {
    toast(h,type,title,text){
        const color = {
            success:'#67C23A',
            warning:"#E6A23C",
            error:"#F56C6C",
            info:"#909399"
        }
        Notification ({
            title:title,
            message:h("span",{
                style:"color:"+color[type]
            },
            text),
            type:type
        })
    },
    changeDate(time,length){
        let date = time?new Date(time):new Date();
        let year = date.getFullYear()
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds()
        return year+'-'+this.checkSize(month)+"-"+this.checkSize(day)+" "+this.checkSize(hour)+":"+this.checkSize(minute)+":"+this.checkSize(second)
    },
    checkSize(val){
        if(val<10){
            return '0'+val;
        }else{
            return val;
        }
    },
    //设置cookie
    setCookie(name,data,time){
        document.cookie = name+'='+JSON.stringify(data)+";expires="+new Date(new Date().getTime()+(1000*60*60*24))
    },
    deleteCookie(name){
        document.cookie = name+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    //获取cookie
    getCookie(name){
        let allCookie = document.cookie.split(";");
        let current = ""
        allCookie.forEach(it=>{
            if(it.indexOf(name)!=-1){
                current = it;
            }
        })
        return current?JSON.parse(current.trim().substring(name.length+1)):""
    },
    /**
     * 检查路由
     */
    checkRouter(route,path){
        return route.path == path?true:false
    }
}
export default func