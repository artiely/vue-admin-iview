<template>
  <div class="container">
    <div id="sticker">
      <div id="stickerCon">
        <slot></slot>
      </div>
    </div>
    <div id="footer">©copyright by Artiely</div>
  </div>
</template>

<script>
  export default {
    name: 'container',
    data () {
      return {}
    }
  }

</script>
