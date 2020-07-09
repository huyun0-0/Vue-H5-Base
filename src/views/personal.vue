<template>
  <div>
    个人中心
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  async created() {
    try {
      const res = await this.userInfo()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions('user', ['userInfo'])
  }
}
</script>

<style lang="scss" scoped>

</style>
