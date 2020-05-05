<template>
    <div class="home">
        <div class="header">
            <headerTop></headerTop>
            <div class="mt-1">

            <labelHeader></labelHeader>
            </div>
        </div>
    </div>
</template>

<script>
import headerTop from "@/components/header/header.vue"
import labelHeader from "@/components/label/labelHeader.vue"
export default {
    components: {
        headerTop,
        labelHeader
    }
}
</script>

<style lang="less" scoped>
.mt-1{
    margin-top: 2px;
}
</style>