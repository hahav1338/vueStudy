
<template>
  <div id="firstcomponent">
    <h1>I am a title.</h1>
    <a> written by {{ abc}} </a>
  </div>
</template>

<script type="text/javascript">
export default {
     name: 'firstComponent',
     props:['abc'],
      data () {
        return {
          author: "微信公众号 jinkey-love"
        }
      }
}
</script>

<style>
</style>
