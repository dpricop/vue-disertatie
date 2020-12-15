<template>
  <MainNav :toggle="false" />
  <div class="row g-0">
    <router-view />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav/MainNav";

export default {
  name: "",
  components: {
    MainNav,
  },
};
</script>