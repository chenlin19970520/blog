const state =()=>({
    userInfo:""
})
const mutations = {
    set_userInfo_value(state,value){
        state.userInfo = value;
    }
}
const actions = {
    modifyUserInfo({ commit }, value){
        commit("set_userInfo_value",value)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}