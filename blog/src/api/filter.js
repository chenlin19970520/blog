const filter = {
    phone(str){
        let reg = new RegExp(/^1[3456789]\d{9}$/g);
        return reg.test(str)
    },
    idNumber(str){
        let reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
        return reg.test(str)
    },
    email(str){
        let reg = new RegExp(/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/);
        return reg.test(str)
    }
}

export default filter