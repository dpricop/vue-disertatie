<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    },
  },
  components: {
      EmptyLayout, MainLayout
  }
};
</script> 

<style scoped>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
