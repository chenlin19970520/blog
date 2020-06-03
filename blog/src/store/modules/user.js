const state =()=>({
    userInfo:"",
    infoDetail:""
})
const mutations = {
    set_userInfo_value(state,value){
        state.userInfo = value;
    },
    set_InfoDetail_value(state,value){
        state.infoDetail = value;
    }
}
const actions = {
    modifyUserInfo({ commit }, value){
        commit("set_userInfo_value",value)
    },
    modifyUserInfoDetail({ commit }, value){
        commit("set_InfoDetail_value",value)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}