<template>
  <nav
    class="navbar navbar-expand-sm navbar-light bg-light border-bottom sticky-top p-0"
  >
    <div class="container-fluid px-0">
      <button
        class="hamburger hamburger--spin"
        :class="show == true ? 'is-active' : ''"
        type="button"
        @click="toggleVertical()"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-sm-0">
          <li class="nav-item" v-for="link in links" :key="link.url">
            <router-link
              :to="link.url"
              class="nav-link"
              active-class="active"
              :exact="link.exact"
              >{{ link.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MainNavHorizontal",
  props: ["toggle"],
  data: function() {
    return {
      links: [
        { title: "Home", url: "/", exact: true },
        { title: "About", url: "about", exact: true },
      ],
      show: this.toggle,
    };
  },
  components: {},
  methods: {
    toggleVertical() {
      this.show = !this.show;
      this.$parent.toggleMainNavVertical();
    },
  },
};
</script>
<style scoped>
.hamburger,
.navbar-toggler {
  outline: none;
  display: inline-block;
  cursor: pointer;
  box-shadow: none !important;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  margin-top: 5px !important;
  overflow: visible;
}
.hamburger:hover {
  opacity: 0.7;
}
.hamburger.is-active:hover,
button[aria-expanded="true"] {
  opacity: 0.7;
}
.hamburger.is-active .hamburger-inner,
button[aria-expanded="true"] .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
button[aria-expanded="true"] .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after,
button[aria-expanded="true"] .hamburger-inner::after {
  background-color: #000;
}
.hamburger-box {
  width: 40px;
  height: 8px;
  display: inline-block;
  position: relative;
}
.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 40px;
  height: 2px;
  background-color: #000;
  border-radius: 2px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}
button[aria-expanded="false"] .hamburger-inner,
.hamburger--spin .hamburger-inner {
  transition-duration: 0.22s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
button[aria-expanded="false"] .hamburger-inner::before,
.hamburger--spin .hamburger-inner::before {
  transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
}
.hamburger--spin .hamburger-inner::after {
  transition: bottom 0.1s 0.25s ease-in,
    transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
button[aria-expanded="true"] .hamburger-inner,
.hamburger--spin.is-active .hamburger-inner {
  transform: rotate(225deg);
  transition-delay: 0.12s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
button[aria-expanded="true"] .hamburger-inner::before,
.hamburger--spin.is-active .hamburger-inner::before {
  top: 0;
  opacity: 0;
  transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
}

button[aria-expanded="true"] .hamburger-inner::after,
.hamburger--spin.is-active .hamburger-inner::after {
  bottom: 0;
  transform: rotate(-90deg);
  transition: bottom 0.1s ease-out,
    transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.active {
  color: #fff !important;
  background-color: #354052;
}
</style>
