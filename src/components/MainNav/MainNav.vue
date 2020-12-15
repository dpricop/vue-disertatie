<template>
  <MainNavHorizontal :toggle="toggle" />
  <div class="cnt-menu" :class="{ 'col-12': show, 'w-0': !show }">
    <MainNavVertical />
  </div>
</template>

<script>
import MainNavHorizontal from "./components/MainNavHorizontal";
import MainNavVertical from "./components/MainNavVertical";

export default {
  name: "MainNav",
  props: ["toggle"],
  data: function () {
    return {
      show: this.toggle,
    };
  },
  components: {
    MainNavHorizontal,
    MainNavVertical,
  },
  methods: {
    toggleMainNavVertical() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.cnt-menu {
  width: 300px;
  transition: all 0.5s;
}
.w-0 {
  margin-left: -300px;
}
</style>