<template>
  <div class="user-edit">
    <div class="header">
      <headerTop></headerTop>
    </div>
    <div class="edit-header">
      <div class="header-menu">
        <div class="menu-item" :class="menuActive=='userInfo'?'is-active':''">个人资料</div>
        <div class="menu-item" :class="menuActive=='password'?'is-active':''">修改密码</div>
      </div>
    </div>
    <div class="edit-body">
        <div class="body-box">
            <component :is="menuActive"></component>
        </div>
    </div>
  </div>
</template>

<script>
import headerTop from "@/components/header/header.vue";
import userInfo from "@/components/user/info.vue";
import password from "@/components/user/password.vue";

export default {
  components: {
    headerTop,
    userInfo,
    password
  },
  data(){
      return{
          menuActive:"userInfo"
      }
  }
};
</script>

<style lang="less" scoped>
.user-edit {
  background-color: #efefef;
  .edit-header {
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    .header-menu {
      display: flex;
      align-items: center;
      max-width: 972px;
      margin: 0 auto;
      height: 45px;
      font-size: 15px;
      .menu-item {
        color: #909090;
        cursor: pointer;
        margin-right: 1.5rem;
        &:hover {
          color: #098fa4;
        }
      }
      .menu-item.is-active {
        color: #098fa4;
      }
    }
  }
  .edit-body{
           max-width: 972px;
      margin: 0 auto;
      margin-top: 1.25rem;
      .body-box{
          width: 75%;
      }
  }
}
</style>