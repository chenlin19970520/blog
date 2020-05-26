
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
    //设置cookie
    setCookie(name,data){
        document.cookie = name+'='+JSON.stringify(data)+";expires="+new Date(new Date().getTime()+(1000*60*60*24*7))
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
        return current?JSON.parse(current.substring(name.length+1)):""
    },
}
export default func