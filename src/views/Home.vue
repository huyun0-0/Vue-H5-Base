<template>
  <div class="home">
    <router-link to="/personal">点击前往个人中心</router-link>
    <div class="test">hello!</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  created() {
    console.log(this.$store.state.user.token)
  }
}
</script>
<style lang="scss" scpoed>
.test{
  width: 750px;
  height: 750px;
  background: #000;
  color: #fff;
  align-items: center;
  justify-content: center;
}
</style>
