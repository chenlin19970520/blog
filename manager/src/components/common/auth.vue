<template>
    <el-dialog title="权限选择" :visible.sync="show" :show-close="false" width="35%" :close-on-click-modal="false">
            <div class="auth-box">
                <div class="auth-line" v-for="(item,index) in menuList" :key="index">
                    <el-checkbox @change="changeOne($event,item,index)" :indeterminate="item.isIndeterminate" v-model="item.allCheck">{{item.name}}</el-checkbox>
                    <div class="auth-line-two">
                        <el-checkbox @change="changeTwo($event,index,sux)" v-for="(sub,sux) in item.subs" v-model="sub.check" :key="sux">{{sub.name}}</el-checkbox>
                    </div>
                </div>
            </div>
           <div class="flex-end flex-row">
                <el-button @click="closeModal">取消</el-button>
                <el-button type="primary" @click="saveSelect">保存</el-button>
           </div>
        </el-dialog>

</template>

<script>
export default {
    props:{
        show:{
            type:Boolean,
            value:false
        },
        list:{
            type:Array,
            value:[]
        },

    },
    watch:{
        list:{
            handler(val){
                this.menuList = JSON.parse(JSON.stringify(val));
            },deep:true,
        },
    },
    data() {
        return {
            menuList:[]
        };
    },
    methods:{
        /**
         * 返回选中的列表
         */
        saveSelect(){
            this.$emit("select",this.menuList)
        },
        /**
         * @description：关闭
         */
        closeModal(){
            // this.menuList = []
            this.$emit("close")
        },
        /**
         * @description:选择第一
         */
        changeOne(e,item,index){
            this.menuList[index].allCheck = e;
            this.menuList[index].isIndeterminate  = e;
            this.menuList[index].subs.map(it=>it.check = e);
            this.menuList=JSON.parse(JSON.stringify(this.menuList));
        },
        /**
         * @description:选择二级
         */
        changeTwo(e,index,sux){
            this.menuList[index].subs[sux].check = e;
            this.checkSelectALL(index);
        },
        /**
         * @descripton:检查全选。
         */
        checkSelectALL(index){
            let length = this.menuList[index].subs.length;
            this.menuList[index].isIndeterminate = length>0&&this.menuList[index].subs.filter(it=>{return it.check}).length>=1
            this.menuList[index].allCheck = length>0&&length==this.menuList[index].subs.filter(it=>{return it.check}).length;
            this.limenuListst=JSON.parse(JSON.stringify(this.menuList));
        }
    }
};
</script>

<style lang="less" scoped>
.flex-row{
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.flex-end{
    justify-content: flex-end;
}
.auth-box{
    .auth-line{
        margin-top: 10px;
        .auth-line-two{
            margin-top: 10px;
            padding-left: 40px;
        }
    }
}
</style>