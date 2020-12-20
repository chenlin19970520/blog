import func from './function';
const dateTime = (val)=>{
    let result = "";
      const minute = 1000 * 60; //一分钟
      const hour = minute * 60; //一小时
      const day = hour * 24; //一天
      let newTime = new Date().getTime();
      let diffValue = newTime - val; //时间差。
      if (diffValue <= 0) {
        return (result = "刚刚");
      }
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minuteC = diffValue / minute;
      if (parseInt(dayC) > 3) {
        result = func.changeDate(val).subtring(0, 10);
      } else if (parseInt(dayC) > 1) {
        result = "" + parseInt(dayC) + "天前";
      } else if (parseInt(dayC) == 1) {
        result = "昨天";
      } else if (parseInt(hourC) >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (parseInt(minuteC) >= 1) {
        result = "" + parseInt(minuteC) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
}
const changeDate = (val)=>{
        let date = val?new Date(val):new Date();
        let year = date.getFullYear()
        let month = date.getMonth()+1;
        let day = date.getDate();
        let str = year+'年'+func.checkSize(month)+"月"+func.checkSize(day)+"日";
        return str
}
export default {
    dateTime:dateTime,
    changeDate:changeDate
}