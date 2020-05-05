<template>
  <div class="input-line" :class="className.indexOf('username')!=-1?'active':''">
    <el-input
      :placeholder="place"
      @focus="addClass('username')"
      v-model="value"
      @input="inputValue"
      @blur="addClass('username')"
    ></el-input>
    <div class="bottom-line">
      <div class="active-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    place: {
      type: String,
      value: () => ""
    },
  },
  data() {
    return {
      value: "",
      className: "" //是否选中
    };
  },
  methods: {
    /**
     * @description:添加className
     */
    addClass(name) {
      if (this.className.indexOf(name) == -1) {
        this.className = this.className + name;
      } else {
        this.className = this.className.replace(name, "");
      }
    },
    /**
     * @description:获取输入
     */
    inputValue(e) {
      this.$emit("getValue", e);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-input__inner {
  border: none;
  padding: 0;
}
.active {
  .bottom-line {
    background-color: transparent;
    .active-line {
      width: 100%;
    }
  }
}
.bottom-line {
  width: 100%;
  background-color: #dcdfe6;
  height: 1px;
  .active-line {
    width: 0px;
    height: 1px;
    margin: 0 auto;
    background-color: rgba(9, 143, 167);
    transition: all 0.25s ease-in-out;
  }
}
</style>