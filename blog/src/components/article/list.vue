<template>
  <div class="article_list">
    <div class="list-body">
      <div class="body-type">
        <div class="type-item type-active">热门</div>
        <div class="type-item">最新</div>
      </div>
      <div class="body-detail">
        <div class="detail-item">
          <div class="item-info">
            <div class="item-label">专栏</div>
            <div class="item-name">司徒老美</div>
            <div class="item-time">10分钟前</div>
            <div class="item-type">前端</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="list-other">dd</div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.article_list {
  max-width: 972px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .list-body {
    width: 75%;
    background-color: white;
    font-size: 14px;
    .body-detail {
        padding: 20px;
        box-sizing: border-box;
      .detail-item {
        .item-info {
          display: flex;
          div {
              &:not(:first-of-type) {
              padding-left: 16px;
              position: relative;
              &:before {
                content: "";
                width: 2px;
                height: 2px;
                border-radius: 100%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 8px;
                background-color: red;
              }
            }
          }
        }
      }
    }
    .body-type {
      display: flex;
      padding: 10px 20px;
        box-sizing: border-box;

      .type-active {
        color: #007fff !important;
      }
      .type-item {
        margin-right: 30px;
        color: #999;
        &:not(:last-of-type) {
          position: relative;
          &:after {
            content: "";
            width: 1px;
            height: 80%;
            background-color: rgba(0, 0, 0, 0.05);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -15px;
          }
        }
      }
    }
  }
  .list-other {
    width: 20%;
  }
}
</style>