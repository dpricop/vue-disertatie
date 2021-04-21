<template>
  <nav class="nav flex-column h-100 position-fixed border-0">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      class="nav-link text-wrap"
      active-class="active"
      :title="link.title"
    >
      {{ link.title }}
    </router-link>
  </nav>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Home", url: "/" },
      { title: "Dashboard", url: "dashboard" },
      { title: "Tasks", url: "tasks" },
      { title: "Opportunities", url: "opportunities" },
      { title: "Leads", url: "leads" },
      { title: "Reports", url: "reports" },
      { title: "Partners", url: "partners" },
      { title: "Contacts", url: "contacts" },
      { title: "Email campaigns", url: "campaingas" },
      { title: "Settings", url: "settings" },
    ],
  }),
  methods: {},
};
</script>

<style scoped>
.nav {
  width: inherit;
  width: 300px;
  overflow-x: hidden;
  z-index: 1045;
}
.nav-link,
.nav {
  background-color: #354052;
  color: #eee;
  border-left: 5px solid transparent;
}
.nav-link:hover {
  background-color: rgba(71, 186, 193, 0.8);
}
.active {
  color: #fff;
  background-color: #2f3949;
  border-left: 5px solid #47bac1;
}
</style>
