<template>
  <div class="a-box">
  <div class="a-box-body">
   <slot></slot>
  </div>
  </div>
</template>
<script>

</script>
<style scoped lang="less">
  .a-box{
    background: #fff;
    border-radius: 4px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    transition: all .3s;
    &:hover{
      box-shadow: 1px 3px 8px rgba(0,0,0,.1);
    }
    .a-box-body{
      padding: 24px;
    }
  }
</style >
