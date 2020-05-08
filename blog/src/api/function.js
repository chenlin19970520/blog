
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
    }
}
export default func