<template>
  <div class="user-info">
    <div class="info-title">个人资料</div>
    <div class="setting-list">
      <div class="set-item">
        <div class="set-title">头像</div>
        <div class="set-input">
            <div>
                <img src="" alt="">
            </div>
            <div>
                <div>支持jpg、png格式大小5M以内的图片</div>
            </div>
        </div>
        <div class="set-opeat"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.user-info {
  background-color: white;
  padding: 2.5rem;
  box-sizing: border-box;
  .info-title {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .setting-list {
    .set-item {
      border-top: 1px solid #f1f1f1;
      padding: 2rem 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .set-title {
        width: 20%;
        text-align: left;
      }
      .set-input {
        width: 65%;
      }
      .set-opeat {
        width: 15%;
      }
    }
  }
}
</style>