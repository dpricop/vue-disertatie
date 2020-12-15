<template>
  <nav class="nav flex-column h-100 position-fixed">
    <router-link v-for="link in links" :key="link.url" :to="link.url" class="nav-link text-wrap" active-class="active" :title="link.title">
      {{ link.title }}
    </router-link>
  </nav>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Dashboard", url: "dashboard" },
      { title: "Accounts", url: "accounts" },
      { title: "Contacts", url: "contacts" },
      { title: "My tasks", url: "tasks" },
      { title: "Opportunities", url: "opportunities" },
      { title: "Leads", url: "leads" },
      { title: "Reports", url: "reports" },
      { title: "Home", url: "/" },
      { title: "About", url: "/about" },
      { title: "Project", url: "project" },
      { title: "Email campaigns", url: "campaingas" },
      { title: "Settings", url: "settings" }
    ]
  }),
};
</script>

<style scoped>
.nav{
  width: inherit;
  width: 300px;
  overflow-x: hidden;
}
.nav-link, .nav {
  background-color: #6f79a8;
  color: #eee;
}
.nav-link:hover {
  background-color: rgba(111,169,193, 0.9);
}
.active {
  color: #fff;
  background-color: #6fa9c1;
}
</style>
